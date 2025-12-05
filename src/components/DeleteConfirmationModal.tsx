import { Modal, Button, Group, Text, Stack, Alert } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

interface DeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
  type: 'device' | 'file'; // To customize text if needed
}

const DeleteConfirmationModal = ({ 
    opened, 
    onClose, 
    onConfirm, 
    selectedCount, 
    type 
}: DeleteConfirmationModalProps) => {

  const itemText = type === 'device' ? 
    `You are about to remove ${selectedCount} devices from monitoring.` : 
    `You are about to delete ${selectedCount} sensitive files.`;

  const warningText = type === 'device' ? 
    `Warning: Removing devices will stop all data monitoring and protection on these devices. You can re-enroll them later by reinstalling the agent.` :
    `Warning: Deleting sensitive files is irreversible and requires administrative logging.`;

  const title = type === 'device' ? 'Delete Devices' : 'Delete Sensitive Files';
  const confirmLabel = `Delete ${selectedCount} item${selectedCount !== 1 ? 's' : ''}`;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={600} size="lg" c="white">{title}</Text>}
      centered
      radius="md"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      // Ensure modal content uses dark background
      styles={{
        content: { backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' },
        header: { backgroundColor: 'var(--mantine-color-dark-7)', borderBottom: 'none' },
        close: { color: 'var(--mantine-color-gray-5)' },
      }}
    >
      <Stack gap="lg">
        {/* Main description */}
        <Text size="sm" c="white">
          {itemText} The DLP agent will be unregistered from these devices.
        </Text>

        {/* Warning Alert (Matches Screenshot Styling) */}
        <Alert
          variant="filled"
          color="red"
          radius="md"
          icon={<IconAlertTriangle size={20} />}
          style={{ 
            // Use lighter red background and specific text style
            backgroundColor: 'var(--mantine-color-red-9)', 
            color: 'var(--mantine-color-gray-0)', 
            border: '1px solid var(--mantine-color-red-6)'
          }}
        >
          <Text size="sm" fw={500} c="white" style={{ lineHeight: 1.4 }}>
             {warningText}
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
            color="red"
            // Button label matches the count
          >
            {confirmLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteConfirmationModal;