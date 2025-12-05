import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    IconArrowLeft, IconFileText, IconMail, IconKey, IconCreditCard, 
    IconFilter, IconCircleCheck, IconCircleX,  
    IconChevronRight, 
} from '@tabler/icons-react';
import { 
    Box, Container, Group, Text, Paper, SimpleGrid, 
    Tabs, Checkbox, Button, ThemeIcon, Badge, rem, Stack, ActionIcon,
} from "@mantine/core";

import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";

// --- MOCK DATA ---
const deviceData = {
  "dev-001": {
    name: "MacBook Pro - John",
    os: "macOS Sonoma 14.2",
    ip: "192.168.1.105",
    agent: "Agent v3.2.1",
    status: "online" as const,
    sensitiveData: 337,
    categories: 7,
    violations: 6,
    blocked: 4,
    dataEvents: 14,
  },
};

const sensitiveDataItems = [
  {
    id: 1,
    icon: IconFileText,
    name: "Social Security Numbers",
    severity: "HIGH",
    category: "PII",
    path: "/Users/john/Documents/HR/",
    files: ["EMPLOYEES.XLSX", "PAYROLL_2024.CSV", "CONTRACTS.DOCX"],
    instances: 23,
  },
  {
    id: 2,
    icon: IconCreditCard,
    name: "Credit Card Numbers",
    severity: "CRITICAL",
    category: "FINANCIAL",
    path: "/Users/john/Downloads/",
    files: ["ORDERS.CSV", "CUSTOMER_DATA.XLSX"],
    instances: 8,
  },
  {
    id: 3,
    icon: IconMail,
    name: "Email Addresses",
    severity: "MEDIUM",
    category: "PII",
    path: "/Users/john/Documents/Marketing/",
    files: ["LEADS.CSV", "CONTACTS.XLSX", "NEWSLETTER.TXT"],
    instances: 156,
  },
  {
    id: 4,
    icon: IconKey,
    name: "API Keys & Secrets",
    severity: "CRITICAL",
    category: "CREDENTIALS",
    path: "/Users/john/Projects/",
    files: [".ENV", "CONFIG.JSON", "SECRETS.YAML"],
    instances: 12,
  },
];

const violationItems = [
  {
    id: 1,
    type: "File Upload",
    app: "Chrome",
    destination: "drive.google.com",
    dataType: "Credit Card Numbers",
    time: "Today, 2:34 PM",
    status: "blocked",
  },
  {
    id: 2,
    type: "Copy to Clipboard",
    app: "Excel",
    destination: "System Clipboard",
    dataType: "Social Security Numbers",
    time: "Today, 11:20 AM",
    status: "allowed",
  },
  {
    id: 3,
    type: "Email Attachment",
    app: "Outlook",
    destination: "external@company.com",
    dataType: "Financial Data",
    time: "Yesterday, 4:15 PM",
    status: "blocked",
  },
];

const dataTraversalItems = [
  { id: 1, type: "File Access", path: "/Users/john/Documents/HR/employees.xlsx", time: "Today, 3:45 PM", action: "Read" },
  { id: 2, type: "File Modified", path: "/Users/john/Projects/config.json", time: "Today, 2:30 PM", action: "Write" },
  { id: 3, type: "File Access", path: "/Users/john/Downloads/orders.csv", time: "Today, 1:15 PM", action: "Read" },
];

// --- HELPER FUNCTIONS ---
const getStatusColor = (status: 'online' | 'warning' | 'offline') => {
    if (status === 'online') return { color: 'green', text: 'ONLINE' };
    if (status === 'warning') return { color: 'yellow', text: 'WARNING' };
    return { color: 'gray', text: 'OFFLINE' };
};

const getSeverityStyle = (severity: string) => {
    switch (severity) {
        case "CRITICAL": return { color: 'red', text: 'CRITICAL', bg: 'rgba(250, 82, 82, 0.15)' };
        case "HIGH": return { color: 'orange', text: 'HIGH', bg: 'rgba(253, 126, 20, 0.15)' };
        case "MEDIUM": return { color: 'yellow', text: 'MEDIUM', bg: 'rgba(250, 176, 5, 0.15)' };
        default: return { color: 'gray', text: 'LOW', bg: 'rgba(134, 142, 150, 0.15)' };
    }
};

const getViolationStatusStyle = (status: string) => {
    if (status === 'blocked') return { color: 'red', text: 'Blocked', icon: IconCircleX };
    return { color: 'teal', text: 'Allowed', icon: IconCircleCheck };
};
// --- END HELPERS ---

const DeviceDetail = () => {
//   const { id } = useParams();
  const [activeTab, setActiveTab] = useState<string | null>("sensitive");

  // In a real app, use the 'id' to fetch specific device data
  const device = deviceData["dev-001"]; 
  const deviceStatus = getStatusColor(device.status);

  return (
    <Box 
        style={{ 
            minHeight: "100vh", 
            backgroundColor: "var(--mantine-color-dark-8)", 
            color: "white" 
        }}
    >
      <Header />

      <Container size="xl" py="lg">
        {/* Back Link */}
        <Group mb="lg" gap="xs">
            <IconArrowLeft size={16} color="var(--mantine-color-cyan-5)" />
            <Link to="/dashboard" style={{ color: 'var(--mantine-color-cyan-5)', textDecoration: 'none', fontSize: rem(14), fontWeight: 500 }}>
                Back to Dashboard
            </Link>
        </Group>

        {/* Device Header Info */}
        <Group justify="space-between" align="flex-start" mb="xl">
          <Stack gap={rem(4)}>
            <Text size="26px" fw={700} c="white" style={{ lineHeight: 1.2 }}>{device.name}</Text>
            <Group gap="xs" c="dimmed" style={{ fontSize: rem(14) }}>
              <Text span>{device.os}</Text>
              <Text span>•</Text>
              <Text span>{device.ip}</Text>
              <Text span>•</Text>
              <Text span>{device.agent}</Text>
            </Group>
          </Stack>
          
          <Badge 
            color="cyan" 
            variant="outline" 
            size="lg" 
            radius="lg"
            leftSection={<IconCircleCheck size={14} style={{ marginTop: 1 }} />}
            style={{ textTransform: 'uppercase' }}
          >
            {deviceStatus.text}
          </Badge>
        </Group>

        {/* Summary Stats Cards */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md" mb="xl">
          
          <SummaryCard 
            title="Sensitive Data Found"
            value={device.sensitiveData}
            description={`Across ${device.categories} categories`}
          />

          <SummaryCard 
            title="Policy Violations"
            value={device.violations}
            valueColor="red.6" // Passing the specific color
            description={`${device.blocked} blocked`}
          />

          <SummaryCard 
            title="Data Access Events"
            value={device.dataEvents}
            description="Last 30 days"
          />

        </SimpleGrid>

        {/* Tabs Navigation */}
        <Tabs 
            value={activeTab} 
            onChange={setActiveTab}
            color="cyan" 
            variant="pills"
            radius="sm"
            mb="xl" 
        >
            <Tabs.List style={{ backgroundColor: 'var(--mantine-color-dark-7)', padding: rem(4), borderRadius: rem(8), border: '1px solid var(--mantine-color-dark-4)' }}>
                <Tabs.Tab value="sensitive" fw={600} style={{ flex: 1 }}>Sensitive Data</Tabs.Tab>
                <Tabs.Tab value="violations" fw={600} style={{ flex: 1 }}>Violations ({device.violations})</Tabs.Tab>
                <Tabs.Tab value="traversal" fw={600} style={{ flex: 1 }}>Data Traversal ({device.dataEvents})</Tabs.Tab>
            </Tabs.List>

            {/* --- TAB 1: SENSITIVE DATA --- */}
            <Tabs.Panel value="sensitive" mt="md">
                <Paper withBorder radius="md" style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' }}>
                    
                    {/* Panel Header */}
                    <Group justify="space-between" align="center" p="md" style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
                        <Stack gap={0}>
                            <Text size="lg" fw={600} c="white">Confidential Data Found</Text>
                            <Text size="sm" c="dimmed">Sensitive information discovered on this device</Text>
                        </Stack>
                        <Button  size="xs" color="gray" leftSection={<IconFilter size={14} />}>
                            Filter
                        </Button>
                    </Group>

                    {/* Select All Row */}
                    <Group p="sm" gap="xs" style={{ borderBottom: '1px solid var(--mantine-color-dark-4)', backgroundColor: 'var(--mantine-color-dark-6)' }}>
                        <Checkbox color="gray" size="xs" ml="xs" />
                        <Text size="xs" c="dimmed">Select all</Text>
                    </Group>

                    {/* List Items */}
                    <Stack gap={0}>
                        {sensitiveDataItems.map((item) => {
                            const severity = getSeverityStyle(item.severity);
                            return (
                                <div key={item.id} style={{ borderBottom: '1px solid var(--mantine-color-dark-4)', padding: rem(16) }}>
                                    <Group align="flex-start" wrap="nowrap">
                                        <Checkbox color="gray" mt={rem(4)} size="xs" />
                                        
                                        {/* Icon Box */}
                                        <ThemeIcon size={42} radius="md" color="dark.4" variant="filled">
                                            <item.icon size={20} color="var(--mantine-color-gray-4)" />
                                        </ThemeIcon>
                                        
                                        <div style={{ flex: 1 }}>
                                            <Group gap="sm" mb={rem(4)}>
                                                <Text fw={600} size="sm" c="white">{item.name}</Text>
                                                <Badge 
                                                    variant="light" 
                                                    size="xs" 
                                                    color={severity.color}
                                                    radius="lg"
                                                    style={{ textTransform: 'uppercase' }}
                                                >
                                                    {severity.text}
                                                </Badge>
                                                <Badge variant="outline" size="xs" color="cyan" radius="lg">
                                                    {item.category}
                                                </Badge>
                                            </Group>
                                            
                                            <Badge color="gray" size="sm" radius="sm">
                                                <Text variant = "outline"size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                                                    {item.path}
                                                </Text>
                                            </Badge>
                                            
                                            <Group gap={rem(6)}>
                                                {item.files.map((file) => (
                                                    <Badge key={file} color="gray" size="xs" radius="lg" style={{ textTransform: 'none', fontWeight: 500 }}>
                                                        {file}
                                                    </Badge>
                                                ))}
                                            </Group>
                                        </div>

                                        <Stack align="flex-end" gap={0}>
                                            <Text fw={700} size="lg" c="white">{item.instances}</Text>
                                            <Text size="xs" c="dimmed">instances</Text>
                                        </Stack>
                                    </Group>
                                </div>
                            );
                        })}
                    </Stack>
                    
                    {/* Pagination Footer */}
                    <Group justify="space-between" p="md">
                        <Text size="xs" c="dimmed">Showing 1 to 4 of 7 results</Text>
                        <Group gap={5}>
                            <ActionIcon variant="default" size="sm" disabled><IconChevronRight size={14} style={{transform: 'rotate(180deg)'}} /></ActionIcon>
                            <Button size="xs" variant="filled" color="cyan">1</Button>
                            <Button size="xs" variant="default">2</Button>
                            <ActionIcon variant="default" size="sm"><IconChevronRight size={14} /></ActionIcon>
                        </Group>
                    </Group>
                </Paper>
            </Tabs.Panel>

            {/* --- TAB 2: VIOLATIONS --- */}
            <Tabs.Panel value="violations" mt="md">
                <Paper withBorder radius="md" style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' }}>
                     <Stack p="md" gap={0} style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
                        <Text size="lg" fw={600} c="white">Policy Violations</Text>
                        <Text size="sm" c="dimmed">Data transfer attempts and policy breaches</Text>
                    </Stack>

                    <Stack gap={0}>
                        {violationItems.map((item) => {
                             const statusStyle = getViolationStatusStyle(item.status);
                             return (
                                <Group key={item.id} justify="space-between" p="md" align="center">
                                    <Stack gap={rem(4)}>
                                        <Group gap="xs">
                                            <Text fw={600} size="sm" c="white">{item.type}</Text>
                                            <Text size="xs" c="dimmed">via</Text>
                                            <Text size="sm" c="white">{item.app}</Text>
                                        </Group>
                                        <Text size="sm" c="dimmed">{item.destination} • {item.dataType}</Text>
                                        <Text size="xs" c="dimmed">{item.time}</Text>
                                    </Stack>

                                    <Group>
                                        <Badge 
                                            color={statusStyle.color} 
                                            variant="light" 
                                            size="md" 
                                            radius="sm"
                                            leftSection={<statusStyle.icon size={12} style={{ marginTop: 4 }} />}
                                        >
                                            {statusStyle.text.toUpperCase()}
                                        </Badge>
                                        {item.status === 'allowed' && (
                                            <Button variant="subtle" size="xs" color="gray">Not a Violation</Button>
                                        )}
                                    </Group>
                                </Group>
                             );
                        })}
                    </Stack>
                </Paper>
            </Tabs.Panel>

            {/* --- TAB 3: DATA TRAVERSAL --- */}
            <Tabs.Panel value="traversal" mt="md">
                <Paper withBorder radius="md" style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' }}>
                    <Stack p="md" gap={0} style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
                        <Text size="lg" fw={600} c="white">Data Traversal Log</Text>
                        <Text size="sm" c="dimmed">File access and modification events</Text>
                    </Stack>

                    <Stack gap={0}>
                        {dataTraversalItems.map((item) => (
                            <Group key={item.id} justify="space-between" p="md" align="center">
                                <Stack gap={rem(4)}>
                                    <Group gap="xs">
                                        <Text fw={600} size="sm" c="white">{item.type}</Text>
                                        <Badge variant="filled" color="cyan" size="xs" radius="sm">{item.action}</Badge>
                                    </Group>
                                    <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>{item.path}</Text>
                                </Stack>
                                <Text size="xs" c="dimmed">{item.time}</Text>
                            </Group>
                        ))}
                    </Stack>
                </Paper>
            </Tabs.Panel>
        </Tabs>

      </Container>
    </Box>
  );
};

export default DeviceDetail;