import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogCloseButton,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Dialog root doesn't have many visual props, focus on Content sizes via wrapper
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DialogExample = ({ size }: { size: "small" | "medium" | "large" }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="primary">모달 열기 ({size})</Button>
    </DialogTrigger>
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>모달 제목</DialogTitle>
        <DialogCloseButton />
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          <p>이것은 {size} 크기의 모달 본문입니다.</p>
          <div className="rounded bg-neutral-light p-4">
            <p className="text-sm text-neutral-text-body">
              디자인 시스템의 토큰과 일관된 패딩을 사용합니다.
            </p>
          </div>
          <DialogDescription>
            이 설명은 스크린 리더에서 제목 다음으로 읽어주는 텍스트입니다.
          </DialogDescription>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="secondary" size="sm">
          취소
        </Button>
        <Button variant="primary" size="sm">
          확인
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Small: Story = {
  render: () => <DialogExample size="small" />,
};

export const Medium: Story = {
  render: () => <DialogExample size="medium" />,
};

export const Large: Story = {
  render: () => <DialogExample size="large" />,
};
