import { Modal, Button, Group, Text, Stack, Alert, rem, Paper } from '@mantine/core';
import { IconAlertTriangle, IconShieldCheck, IconCircleX } from '@tabler/icons-react';

interface ActionConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  
  // Content specific to the action
  actionType: 'confirm_violation' | 'mark_not_violation';
  titleContext: string; // e.g., "Copy to Clipboard" or "Credit Card Numbers"
  details: string[]; // e.g., ["Excel -> System Clipboard", "2024-12-04 11:15:09"]
}

const ActionConfirmationModal = ({ 
    opened, 
    onClose, 
    onConfirm, 
    actionType, 
    titleContext, 
    details
}: ActionConfirmationModalProps) => {

  const isViolation = actionType === 'confirm_violation';

  const title = isViolation ? 
    "Mark as Violation" : 
    "Mark as Not a Violation";
    
  const primaryActionLabel = isViolation ? "Confirm Mark as Violation" : "Confirm Not a Violation";
  
  const description = isViolation ? 
    "Are you sure you want to mark this data traversal event as a policy violation?" :
    "Are you sure you want to mark this event as not a policy violation? The event will be moved to Data Traversal for tracking purposes.";

  const finalWarning = isViolation ? 
    "This action will flag the event as a policy violation and impact the device's compliance score." :
    "This action will remove the event from Violations and add it to Data Traversal.";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={600} size="lg" c="white">{title}</Text>}
      centered
      radius="md"
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      styles={{
        content: { backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' },
        header: { backgroundColor: 'var(--mantine-color-dark-7)', borderBottom: 'none' },
        close: { color: 'var(--mantine-color-gray-5)' },
      }}
    >
      <Stack gap="lg">
        {/* Main description */}
        <Text size="sm" c="white">{description}</Text>

        {/* Contextual Data Box */}
        <Paper p="md" radius="md" style={{ backgroundColor: 'var(--mantine-color-dark-6)', border: '1px solid var(--mantine-color-dark-5)' }}>
            <Text size="sm" fw={600} c="cyan" mb={rem(4)}>{titleContext}</Text>
            {details.map((detail, index) => (
                <Text key={index} size="xs" c="dimmed">{detail}</Text>
            ))}
        </Paper>

        {/* Action Warning */}
        <Alert
          variant="filled"
          color={isViolation ? "red" : "teal"}
          radius="md"
          icon={isViolation ? <IconAlertTriangle size={20} /> : <IconShieldCheck size={20} />}
          style={{ 
            backgroundColor: isViolation ? 'var(--mantine-color-red-9)' : 'var(--mantine-color-teal-9)', 
            color: 'var(--mantine-color-gray-0)', 
          }}
        >
          <Text size="sm" fw={500} c="white" style={{ lineHeight: 1.4 }}>
             {finalWarning}
          </Text>
        </Alert>

        {/* Buttons */}
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose} color="gray">
            Cancel
          </Button>
          <Button 
            variant="filled" 
            onClick={onConfirm} 
            color={isViolation ? "red" : "cyan"}
            leftSection={isViolation ? <IconCircleX size={14} /> : <IconShieldCheck size={14} />}
          >
            {primaryActionLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ActionConfirmationModal;