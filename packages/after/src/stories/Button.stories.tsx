import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success"],
      description: "The visual style of the button.",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "The size of the button.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled.",
    },
    children: {
      control: "text",
      description: "The content of the button.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Action",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary Action",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    size: "md",
    children: "Delete",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    size: "md",
    children: "Save Changes",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};
