import { Group, Text, ThemeIcon, Checkbox, Badge, ActionIcon, Divider } from "@mantine/core";
import { IconDeviceMobile, IconServer, IconDeviceLaptop, IconAlertTriangle, IconCircleCheck, IconChevronRight} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const DeviceRow = ({ device }: { device: any }) => {
    const getIcon = (type: string) => {
        switch(type) {
            case 'mobile': return <IconDeviceMobile size={20} />;
            case 'server': return <IconServer size={20} />;
            default: return <IconDeviceLaptop size={20} />;
        }
    }
    const getStatusColor = (status: string) => {
        if (status === 'online') return 'teal';
        if (status === 'warning') return 'yellow';
        return 'gray';
    }

    return (
        <>
        <Group py="sm" wrap="nowrap" align="center">
            <Checkbox color="gray" size="sm" ml="xs" />
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
                    color={getStatusColor(device.status)} 
                    variant="light" 
                    size="sm" 
                    radius="sm"
                    leftSection={device.status === 'warning' ? <IconAlertTriangle size={10} /> : <IconCircleCheck size={10} />}
                >
                    {device.status.toUpperCase()}
                </Badge>
            </div>

            <ActionIcon 
            variant="subtle" 
            color="gray" 
            component={Link} // <-- FIX: Use react-router-dom's Link component
            to={`/device/dev-001`} // <-- FIX: Use a mock ID based on your route structure
            // NOTE: Since your DeviceDetail uses "dev-001", 
            // you might want a better unique identifier from your devicesData.
            // For now, let's assume the ID you need to pass is 'dev-' plus the device.id.
        >
            <IconChevronRight size={16} />
        </ActionIcon>
        </Group>
        <Divider color="dark.5" />
        </>
    )
}

export default DeviceRow;