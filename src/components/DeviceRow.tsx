// src/components/DeviceRow.tsx

import { Link } from "react-router-dom";
import { Group, Checkbox, ThemeIcon, Text, Badge, ActionIcon, Divider } from "@mantine/core";
import { IconDeviceLaptop, IconDeviceMobile, IconServer, IconChevronRight, IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";

// Helper functions (omitted for brevity, assume they are correct)
const getIcon = (type: string) => {
    switch(type) {
        case 'mobile': return <IconDeviceMobile size={20} />;
        case 'server': return <IconServer size={20} />;
        default: return <IconDeviceLaptop size={20} />;
    }
}

const getStatusColor = (status: 'online' | 'warning' | 'offline') => {
    if (status === 'online') return { color: 'cyan', text: 'ONLINE' };
    if (status === 'warning') return { color: 'yellow', text: 'WARNING' };
    return { color: 'gray', text: 'OFFLINE' };
}

// UPDATED INTERFACE
interface DeviceRowProps {
    device: {
        id: number;
        name: string;
        ip: string;
        time: string;
        type: string;
        violations: number;
        sensitive: number;
        status: 'online' | 'warning' | 'offline'; 
    },
    isSelected: boolean;
    onToggle: () => void;
}

const DeviceRow = ({ device, isSelected, onToggle }: DeviceRowProps) => {
    const statusInfo = getStatusColor(device.status);

    // Handler for the Group click, which should only run if the event didn't start on a control
    const handleRowClick = (e: React.MouseEvent) => {
        // Prevent row selection if the click originated from an interactive element (like the arrow)
        if (!(e.target as HTMLElement).closest('a, button, input')) {
            onToggle();
        }
    };

    return (
        <>
        <Group py="sm" wrap="nowrap" align="center" 
               // Group style remains, but we add a specific click handler
               style={{ cursor: 'pointer', backgroundColor: isSelected ? 'var(--mantine-color-dark-6)' : undefined }}
               onClick={handleRowClick} 
        >
            {/* CHECKBOX: Handles selection logic directly and prevents bubbling */}
            <Checkbox 
                color="cyan" 
                size="sm" 
                ml="xs" 
                checked={isSelected}
                // FIX: Toggle selection directly and stop propagation
                onClick={(e) => {
                    e.stopPropagation(); 
                    onToggle(); 
                }} 
            />
            
            <ThemeIcon size={40} radius="md" color="dark.4" variant="filled">
                {getIcon(device.type)}
            </ThemeIcon>

            <div style={{ flex: 2 }}>
                <Text size="sm" fw={500} c="white">{device.name}</Text>
                <Group gap={6}>
                    <Text size="xs" c="dimmed">{device.ip}</Text>
                    <Text size="xs" c="dimmed">•</Text>
                    <Text size="xs" c="dimmed">{device.time}</Text>
                </Group>
            </div>

            <div style={{ width: 100, textAlign: 'right' }}>
                <Text size="xs" c="dimmed">Violations</Text>
                <Text size="sm" fw={600} c={device.violations > 5 ? 'red.4' : 'white'}>
                    {device.violations}
                </Text>
            </div>

            <div style={{ width: 100, textAlign: 'right', marginRight: 20 }}>
                <Text size="xs" c="dimmed">Sensitive</Text>
                <Text size="sm" fw={600} c="white">
                    {device.sensitive}
                </Text>
            </div>

            <div style={{ width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                <Badge 
                    color={statusInfo.color} 
                    variant="light" 
                    size="sm" 
                    radius="lg"
                    leftSection={device.status === 'warning' ? <IconAlertTriangle size={10} /> : <IconCircleCheck size={10} />}
                >
                    {statusInfo.text}
                </Badge>
            </div>

            {/* Redirection Arrow (Must stop propagation to allow click-through) */}
            <ActionIcon variant="subtle" color="gray" component={Link} to={`/device/${device.id}`} onClick={(e) => e.stopPropagation()}>
                <IconChevronRight size={16} />
            </ActionIcon>
        </Group>
        <Divider color="dark.5" />
        </>
    )
}

export default DeviceRow;