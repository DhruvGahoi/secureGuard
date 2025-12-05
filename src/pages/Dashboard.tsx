// src/pages/Dashboard.tsx

import { useState } from "react";
import {
  IconDeviceDesktop,
  IconCircleCheck,
  IconAlertTriangle,
  IconShieldLock,
  IconChevronRight,
  IconDownload,
  IconDeviceLaptop, 
  IconAlertTriangle as IconAlertTriangleTabler // Renaming to avoid conflict
} from '@tabler/icons-react';
import {
  Box,
  SimpleGrid,
  Paper,
  Text,
  Group,
  Checkbox,
  ActionIcon,
  Stack,
  Tabs,
  rem,
  ThemeIcon,
  Divider,
  Button,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks'; // Hook for modal state

import Header from "../components/Header"; 
import StatCard from "../components/StatCard";
import DeviceRow from "../components/DeviceRow"; 
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"; // Imported Modal

const devicesData = [
    { id: 1, name: "MacBook Pro - John", ip: "192.168.1.105", time: "Just now", type: "laptop", violations: 12, sensitive: 156, status: "online" as const},
    { id: 2, name: "Windows Workstation - Sarah", ip: "192.168.1.112", time: "2 min ago", type: "desktop", violations: 3, sensitive: 89, status: "online" as const},
    { id: 3, name: "Linux Server - DevOps", ip: "192.168.1.50", time: "1 hour ago", type: "server", violations: 0, sensitive: 234, status: "offline" as const},
    { id: 4, name: "iPhone - Marketing Lead", ip: "192.168.1.201", time: "15 min ago", type: "mobile", violations: 7, sensitive: 45, status: "warning" as const},
    { id: 5, name: "Windows Laptop - Finance", ip: "192.168.1.118", time: "Just now", type: "laptop", violations: 1, sensitive: 312, status: "online" as const},
];


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"devices" | "install">("devices");
  
  // STATE MANAGEMENT FOR SELECTION AND DELETION
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<number[]>([]);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  
  const allDeviceIds = devicesData.map(device => device.id);
  const selectedCount = selectedDeviceIds.length;
  const allSelected = selectedCount === allDeviceIds.length && allDeviceIds.length > 0;
  const showDeleteButton = selectedCount > 0;

  // HANDLERS FOR SELECTION
  const toggleAllDevices = () => {
    if (allSelected) {
      setSelectedDeviceIds([]);
    } else {
      setSelectedDeviceIds(allDeviceIds);
    }
  };

  const toggleDevice = (id: number) => {
    setSelectedDeviceIds(prev => 
      prev.includes(id) 
        ? prev.filter(deviceId => deviceId !== id) 
        : [...prev, id]
    );
  };
  
  // HANDLER FOR MODAL CONFIRMATION
  const handleDeviceDeletion = () => {
      console.log(`Confirmed deletion of ${selectedCount} devices.`);
      // Logic to actually delete selectedDeviceIds goes here
      setSelectedDeviceIds([]);
      closeModal();
  };

  const innerPadding = 'lg'; 
  const getDeviceIcon = () => <IconDeviceLaptop size={20} />; 

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--mantine-color-dark-8)", 
        color: "white",
        paddingBottom: 48,
        display: 'flex', 
        flexDirection: 'column',
      }}
    >
      {/* 1. DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
          opened={modalOpened}
          onClose={closeModal}
          onConfirm={handleDeviceDeletion}
          selectedCount={selectedCount}
          type="device"
      />

      <Header />

      <Box 
        px={innerPadding} 
        pt="lg" 
        style={{ 
            width: '100%', 
            maxWidth: '100vw', 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
        }}
      > 
        
        {/* Stat Cards */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing="lg"
          mb="xl" 
        >
          <StatCard title="Total Devices" value="10" icon={<IconDeviceDesktop size={24} />} color="cyan" />
          <StatCard title="Active Now" value="6" icon={<IconCircleCheck size={24} />} color="teal" />
          <StatCard title="Total Violations" value="38" icon={<IconAlertTriangle size={24} />} color="red" />
          <StatCard title="Sensitive Files" value="1849" icon={<IconShieldLock size={24} />} color="green" />
        </SimpleGrid>

        {/* Tabs Bar */}
        <Paper
            radius="md" 
            p={rem(4)} 
            mb="xl" 
            style={{ 
                backgroundColor: 'var(--mantine-color-dark-7)', 
                borderColor: 'var(--mantine-color-dark-4)' 
            }}
        >
            <Tabs 
                value={activeTab} 
                onChange={(v) => setActiveTab(v as "devices" | "install")}
                color="cyan" 
                variant="pills" 
                radius="md"
            >
                <Tabs.List 
                    style={{ 
                        borderBottom: 'none', 
                        padding: 0, 
                        margin: 0 
                    }}
                >
                    <Tabs.Tab value="devices" fw={600} color="cyan">Devices</Tabs.Tab>
                    <Tabs.Tab value="install" fw={600}>Install Agent</Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Paper>


        <Box style={{ flexGrow: 1, display: 'flex' }}> 
            
            {/* Devices Tab Content */}
            {activeTab === 'devices' && (
                <Paper 
                    withBorder 
                    radius="md" 
                    p="md" 
                    style={{ 
                        backgroundColor: 'var(--mantine-color-dark-7)', 
                        borderColor: 'var(--mantine-color-dark-4)',
                        flexGrow: 1,
                    }}
                >
                    {/* Header Row with Delete Button */}
                    <Group justify="space-between" mb="lg">
                        <div>
                            <Text size="lg" fw={700} c="white">Connected Devices</Text>
                            <Text size="sm" c="dimmed">Monitor and manage all devices with DLP agents installed</Text>
                        </div>
                        
                        {/* CONDITIONAL DELETE BUTTON */}
                        {showDeleteButton && (
                            <Button 
                                variant="filled" 
                                color="red"
                                radius="md"
                                onClick={openModal} // Opens the delete confirmation modal
                                leftSection={<IconAlertTriangleTabler size={14} />}
                            >
                                Delete Selected ({selectedCount})
                            </Button>
                        )}
                    </Group>

                    {/* Select All Row */}
                    <Paper 
                        withBorder 
                        p="xs" 
                        mb="md" 
                        radius="md"
                        style={{ backgroundColor: 'var(--mantine-color-dark-6)', borderColor: 'var(--mantine-color-dark-4)' }}
                    >
                        <Group gap="xs">
                            <Checkbox 
                                color="cyan" 
                                size="sm" 
                                ml={4}
                                checked={allSelected}
                                onChange={toggleAllDevices}
                                indeterminate={selectedCount > 0 && !allSelected}
                            />
                            <Text size="sm" c="dimmed" ml={8}>Select all on this page</Text>
                        </Group>
                    </Paper>

                    {/* The Device Rows */}
                    <Stack gap={0} style={{ flexGrow: 1 }}> 
                        {devicesData.map((device) => (
                            <DeviceRow 
                                key={device.id} 
                                device={device} 
                                // Pass selection state and toggle handler to the row
                                isSelected={selectedDeviceIds.includes(device.id)}
                                onToggle={() => toggleDevice(device.id)}
                            />
                        ))}
                    </Stack>

                    <Group justify="space-between" mt="lg">
                        <Text size="sm" c="dimmed">Showing <span style={{color:'white'}}>1</span> to <span style={{color:'white'}}>5</span> of <span style={{color:'white'}}>10</span> results</Text>
                        <Group gap={5}>
                            <ActionIcon variant="default" size="lg" disabled><IconChevronRight size={16} style={{transform: 'rotate(180deg)'}} /></ActionIcon>
                            <ActionIcon variant="filled" color="cyan" size="lg">1</ActionIcon>
                            <ActionIcon variant="default" size="lg">2</ActionIcon>
                            <ActionIcon variant="default" size="lg"><IconChevronRight size={16} /></ActionIcon>
                        </Group>
                    </Group>
                </Paper>
            )}
            
            {/* Install Agent Tab Content */}
            {activeTab === 'install' && (
                <Stack 
                    gap="xl"
                    style={{ flexGrow: 1 }}
                >
                    <Paper 
                        withBorder 
                        radius="md" 
                        p="lg" 
                        style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' }}
                    >
                        <Stack gap="xs" mb="md">
                            <Text size="lg" fw={700} c="white">Download DLP Agent</Text>
                            <Text size="sm" c="dimmed">
                                Install the SecureGuard agent on your devices to enable data protection
                            </Text>
                        </Stack>

                        <Divider color="dark.5" my="sm" />

                        <Stack gap="md"> 
                            {
                            (['Windows', 'macOS', 'Linux', 'iOS'] as const).map(os => (
                                <Paper key={os} withBorder radius="md" p="md" 
                                    style={{ backgroundColor: 'var(--mantine-color-dark-6)', borderColor: 'var(--mantine-color-dark-4)' }}
                                >
                                    <Group justify="space-between" align="center">
                                        <Group gap="md">
                                            <ThemeIcon radius="md" variant="filled" size="lg" color="dark.5">
                                              {getDeviceIcon()}
                                            </ThemeIcon>
                                            <div>
                                                <Text fw={600} c="white">{os}</Text>
                                                <Text size="xs" c="dimmed">{
                                                    os === 'Windows' ? 'Windows 10/11 (64-bit)' :
                                                    os === 'macOS' ? 'macOS 12+ (Apple Silicon & Intel)' :
                                                    os === 'Linux' ? 'Ubuntu, Debian, CentOS, RHEL' :
                                                    'iOS 15+ (MDM Required)'
                                                }</Text>
                                                <Text size="xs" c="dimmed" style={{ marginTop: rem(4) }}>
                                                    v3.2.1 • {os === 'Windows' ? '45 MB' : os === 'macOS' ? '38 MB' : os === 'Linux' ? '32 MB' : '28 MB'}
                                                </Text>
                                            </div>
                                        </Group>
                                        <Button 
                                            variant="filled" 
                                            radius="md" 
                                            size="sm" 
                                            color="cyan" 
                                            leftSection={<IconDownload size={14} />} 
                                        >
                                            Download
                                        </Button>
                                    </Group>
                                </Paper>
                            ))
                            }
                        </Stack>
                    </Paper>

                    <Paper 
                        withBorder 
                        radius="md" 
                        p="lg" 
                        style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' }}
                    >
                        <Text size="lg" fw={700} c="white">Installation Instructions</Text>
                        <Text size="sm" c="dimmed" mb="md">Follow these steps to install the agent</Text>

                        <Stack gap="md">
                            {
                                ([
                                    { num: 1, title: "Download the agent", desc: "Select your operating system and download the installer package" },
                                    { num: 2, title: "Run the installer", desc: "Execute the installer with administrator privileges" },
                                    { num: 3, title: "Enter enrollment key", desc: "Use your organization enrollment key to connect the agent" }
                                ] as const).map(step => (
                                    <Group key={step.num} style={{ alignItems: "flex-start" }}>
                                        <ThemeIcon color="cyan" radius="xl" size="lg">
                                            <Text size="sm" fw={700}>{step.num}</Text>
                                        </ThemeIcon>
                                        <div>
                                            <Text fw={600} c="white">{step.title}</Text>
                                            <Text size="sm" c="dimmed">{step.desc}</Text>
                                        </div>
                                    </Group>
                                ))
                            }

                            <Divider color="dark.5" my="sm" />

                            {/* Enrollment Key Display */}
                            <Text size="sm" c="dimmed">Your Enrollment Key</Text>
                            <Paper 
                                radius="md" 
                                p="md" 
                                style={{ backgroundColor: 'var(--mantine-color-dark-6)', border: '1px solid var(--mantine-color-dark-4)' }}
                            >
                                <Text c="white" fw={300} style={{ fontFamily: 'monospace' }}>SG-ENR-7X9K2M4N8P1Q3R5T</Text>
                            </Paper>
                        </Stack>
                    </Paper>
                </Stack>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;