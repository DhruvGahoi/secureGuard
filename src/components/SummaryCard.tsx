// src/components/SummaryCard.tsx
import { Paper, Text, rem } from "@mantine/core";
import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description: ReactNode;
  valueColor?: string; // Optional prop to handle the red text case
}

const SummaryCard = ({ 
  title, 
  value, 
  description, 
  valueColor = "white" // Default to white if not provided
}: SummaryCardProps) => {
  return (
    <Paper 
      withBorder 
      radius="md" 
      p="lg" 
      style={{ 
        backgroundColor: 'var(--mantine-color-dark-7)', 
        borderColor: 'var(--mantine-color-dark-4)' 
      }}
    >
      <Text size="sm" c="dimmed" fw={500} mb={rem(8)}>
        {title}
      </Text>
      <Text size="32px" fw={700} c={valueColor} style={{ lineHeight: 1 }}>
        {value}
      </Text>
      <Text size="xs" c="dimmed" mt={rem(8)}>
        {description}
      </Text>
    </Paper>
  );
};

export default SummaryCard;