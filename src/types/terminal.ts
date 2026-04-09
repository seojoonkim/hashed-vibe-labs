// Bullet color types for list items
export type BulletColor = "green" | "blue" | "yellow" | "orange" | "gray" | "cyan";

// Terminal line types
export interface TerminalLine {
  id: number;
  type: "command" | "output" | "success" | "error" | "info" | "ascii" | "blank" | "header" | "list-item" | "divider" | "dim" | "link" | "blink" | "box-top" | "box-content" | "box-bottom" | "status-ok" | "status-info" | "system" | "prompt" | "countdown";
  content: string;
  indent?: number;
  href?: string;
  isTyping?: boolean;
  bulletColor?: BulletColor;
  bullet?: boolean;
  bulletChar?: string;
}

// Menu commands
export interface MenuCommand {
  id: string;
  command: string;
  label: string;
  labelKo: string;
}
