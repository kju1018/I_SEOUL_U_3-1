import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseButton,
} from "../components/ui/dialog";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { TableContainer } from "../components/table/TableContainer";
import { UserForm, PostForm } from "../components/forms";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import { cn } from "../lib/utils";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import "../styles/components.css";

type EntityType = "user" | "post";
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === "user") {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      if (entityType === "user") {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || "user",
          status: formData.status || "active",
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || "",
          author: formData.author,
          category: formData.category,
          status: formData.status || "draft",
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`,
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === "user") {
      const user = item as User;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === "user") {
        await userService.update(selectedItem.id, formData);
      } else {
        await postService.update(selectedItem.id, formData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`,
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage("삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore",
  ) => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === "user") {
      const users = data as User[];
      return [
        {
          label: "전체",
          value: users.length,
          variant: "info",
        },
        {
          label: "활성",
          value: users.filter((u) => u.status === "active").length,
          variant: "success",
        },
        {
          label: "비활성",
          value: users.filter((u) => u.status === "inactive").length,
          variant: "warning",
        },
        {
          label: "정지",
          value: users.filter((u) => u.status === "suspended").length,
          variant: "danger",
        },
        {
          label: "관리자",
          value: users.filter((u) => u.role === "admin").length,
          variant: "brand",
        },
      ];
    } else {
      const posts = data as Post[];
      return [
        {
          label: "전체",
          value: posts.length,
          variant: "info",
        },
        {
          label: "게시됨",
          value: posts.filter((p) => p.status === "published").length,
          variant: "success",
        },
        {
          label: "임시저장",
          value: posts.filter((p) => p.status === "draft").length,
          variant: "warning",
        },
        {
          label: "보관됨",
          value: posts.filter((p) => p.status === "archived").length,
          variant: "neutral",
        },
        {
          label: "총 조회수",
          value: posts.reduce((sum, p) => sum + p.views, 0),
          variant: "brand",
        },
      ];
    }
  };

  // 🚨 Table 컴포넌트에 로직을 위임하여 간소화
  const renderTableColumns = () => {
    if (entityType === "user") {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "username", header: "사용자명", width: "150px" },
        { key: "email", header: "이메일" },
        { key: "role", header: "역할", width: "120px" },
        { key: "status", header: "상태", width: "120px" },
        { key: "createdAt", header: "생성일", width: "120px" },
        { key: "lastLogin", header: "마지막 로그인", width: "140px" },
        { key: "actions", header: "관리", width: "200px" },
      ];
    } else {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "title", header: "제목" },
        { key: "author", header: "작성자", width: "120px" },
        { key: "category", header: "카테고리", width: "140px" },
        { key: "status", header: "상태", width: "120px" },
        { key: "views", header: "조회수", width: "100px" },
        { key: "createdAt", header: "작성일", width: "120px" },
        { key: "actions", header: "관리", width: "250px" },
      ];
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-bg-management transition-colors duration-300">
      <div className="mx-auto max-w-[1200px] p-5">
        <div className="mb-5">
          <h1 className="text-[24px] font-bold text-text-primary transition-colors">
            관리 시스템
          </h1>
          <p className="text-[14px] text-text-secondary transition-colors">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <Card variant="bordered" className="p-0 border-alpha-border">
          <CardHeader className="flex flex-col sm:flex-row gap-4 border-b border-alpha-border pb-4 transition-colors">
            <div className="flex gap-2">
              <Button
                variant={entityType === "post" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setEntityType("post")}
                className="h-9 min-w-[80px]"
              >
                게시글
              </Button>
              <Button
                variant={entityType === "user" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setEntityType("user")}
                className="h-9 min-w-[80px]"
              >
                사용자
              </Button>
            </div>
            <CardAction className="sm:ml-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsCreateModalOpen(true)}
              >
                새로 만들기
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className="p-5">
            {showSuccessAlert && (
              <div className="mb-4">
                <Alert variant="success" className="relative pr-12">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>성공</AlertTitle>
                  <AlertDescription>{alertMessage}</AlertDescription>
                  <button
                    onClick={() => setShowSuccessAlert(false)}
                    className="absolute right-2.5 top-2.5 hover:opacity-70 transition-opacity p-1 leading-none flex items-center justify-center shrink-0"
                  >
                    <X className="size-5" />
                  </button>
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div className="mb-4">
                <Alert variant="destructive" className="relative pr-12">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                  <button
                    onClick={() => setShowErrorAlert(false)}
                    className="absolute right-2.5 top-2.5 hover:opacity-70 transition-opacity p-1 leading-none flex items-center justify-center shrink-0"
                  >
                    <X className="size-5" />
                  </button>
                </Alert>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {stats.map((stat, index) => {
                const colors = {
                  info: "bg-info-light border-info-border text-info-dark",
                  success:
                    "bg-success-light border-success-border text-success-dark",
                  warning:
                    "bg-warning-light border-warning-border text-warning-dark",
                  danger:
                    "bg-danger-light border-danger-border text-danger-dark",
                  brand:
                    "bg-brand-light border-brand-border text-brand-primary",
                  neutral:
                    "bg-neutral-bg-strong border-neutral-border text-neutral-dark",
                };

                const valueColors = {
                  info: "text-info-primary",
                  success: "text-success-primary",
                  warning: "text-warning-primary",
                  danger: "text-danger-primary",
                  brand: "text-brand-primary",
                  neutral: "text-neutral-dark",
                };

                const variant = stat.variant as keyof typeof colors;

                return (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-[3px] border transition-colors",
                      colors[variant],
                    )}
                  >
                    <div className="text-[12px] opacity-70 mb-1">
                      {stat.label}
                    </div>
                    <div
                      className={cn(
                        "text-[24px] font-bold transition-colors",
                        valueColors[variant],
                      )}
                    >
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border border-alpha-border bg-bg-primary overflow-auto transition-colors">
              <TableContainer
                columns={renderTableColumns()}
                data={data}
                striped
                hover
                entityType={entityType}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={(id) => handleStatusAction(id, "publish")}
                onArchive={(id) => handleStatusAction(id, "archive")}
                onRestore={(id) => handleStatusAction(id, "restore")}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent size="large">
          <DialogHeader>
            <DialogTitle>
              {`새 ${entityType === "user" ? "사용자" : "게시글"} 만들기`}
            </DialogTitle>
            <DialogCloseButton onClick={() => setIsCreateModalOpen(false)} />
          </DialogHeader>
          <DialogBody>
            {entityType === "user" ? (
              <UserForm
                data={formData}
                onChange={setFormData}
                checkBusinessRules={true}
              />
            ) : (
              <PostForm
                data={formData}
                onChange={setFormData}
                checkBusinessRules={true}
              />
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleCreate}>
              생성
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent size="large">
          <DialogHeader>
            <DialogTitle>
              {`${entityType === "user" ? "사용자" : "게시글"} 수정`}
            </DialogTitle>
            <DialogCloseButton onClick={() => setIsEditModalOpen(false)} />
          </DialogHeader>
          <DialogBody>
            {selectedItem && (
              <Alert variant="info" className="mb-6">
                <Info className="h-4 w-4" />
                <AlertTitle>정보</AlertTitle>
                <AlertDescription>
                  ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                  {entityType === "post" &&
                    ` | 조회수: ${(selectedItem as Post).views}`}
                </AlertDescription>
              </Alert>
            )}

            {entityType === "user" ? (
              <UserForm
                data={formData}
                onChange={setFormData}
                checkBusinessRules={true}
              />
            ) : (
              <PostForm
                data={formData}
                onChange={setFormData}
                checkBusinessRules={true}
              />
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleUpdate}>
              수정 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
