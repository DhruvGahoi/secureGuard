// src/pages/DeviceDetail.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    IconArrowLeft, IconArrowRight,IconFileText, IconMail, IconKey, IconCreditCard, 
    IconFilter, IconCircleCheck, IconCircleX, 
    IconChevronRight,
    IconUpload,
    IconCopy,
    IconWorld,
    IconShieldCheck,
    IconShieldX, 
} from '@tabler/icons-react';
import { 
    Box, Container, Group, Text, Paper, SimpleGrid, 
    Tabs, Checkbox, Button, ThemeIcon, Badge, rem, Stack, ActionIcon,
    Divider,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

import SummaryCard from "../components/SummaryCard"; 
import Header from "../components/Header";
import ActionConfirmationModal from "../components/ActionConfimationModal"; // Assuming this is correct

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
  { id: 1, icon: IconFileText, name: "Social Security Numbers", severity: "HIGH", category: "PII", path: "/Users/john/Documents/HR/", files: ["EMPLOYEES.XLSX", "PAYROLL_2024.CSV", "CONTRACTS.DOCX"], instances: 23, },
  { id: 2, icon: IconCreditCard, name: "Credit Card Numbers", severity: "CRITICAL", category: "FINANCIAL", path: "/Users/john/Downloads/", files: ["ORDERS.CSV", "CUSTOMER_DATA.XLSX"], instances: 8, },
  { id: 3, icon: IconMail, name: "Email Addresses", severity: "MEDIUM", category: "PII", path: "/Users/john/Documents/Marketing/", files: ["LEADS.CSV", "CONTACTS.XLSX", "NEWSLETTER.TXT"], instances: 156, },
  { id: 4, icon: IconKey, name: "API Keys & Secrets", severity: "CRITICAL", category: "CREDENTIALS", path: "/Users/john/Projects/", files: [".ENV", "CONFIG.JSON", "SECRETS.YAML"], instances: 12, },
];

const violationItems = [
  { id: 1, icon: IconUpload, type: "File Upload", app: "Chrome", destination: "drive.google.com", dataType: "Credit Card Numbers", time: "Today, 2:34 PM", status: "blocked", },
  { id: 2, icon: IconCopy, type: "Copy to Clipboard", app: "Excel", destination: "System Clipboard", dataType: "Social Security Numbers", time: "Today, 11:20 AM", status: "allowed", },
  { id: 3, icon: IconMail, type: "Email Attachment", app: "Outlook", destination: "external@company.com", dataType: "Financial Data", time: "Yesterday, 4:15 PM", status: "blocked", },
  { id: 4, icon: IconWorld, type: "Web Upload", app: "Firefox", destination: "dropbox.com", dataType: "Customer PII", time: "Yesterday, 10:30 AM", status: "blocked", }
];


const dataTraversalGroups = [
  {
    type: "Credit Card Numbers",
    files: ["customer_data.xlsx"],
    eventsCount: 4,
    events: [
      { id: 1, date: "2024-12-04 14:34:22", source: "EXCEL", dest: "CHROME", destination: "drive.google.com", actionStatus: "DENIED", action: "Mark as Violation" },
      { id: 2, date: "2024-12-04 11:15:09", source: "DOWNLOADS", dest: "EXCEL", destination: "excel_file.xlsx", actionStatus: "SUCCESS", action: "Mark as Violation" },
      { id: 3, date: "2024-12-03 16:45:33", source: "OUTLOOK", dest: "DOWNLOADS", destination: "email_attachment", actionStatus: "SUCCESS", action: "Mark as Violation" },
      { id: 4, date: "2024-12-03 09:28:11", source: "CHROME", dest: "OUTLOOK", destination: "sheets.google.com", actionStatus: "DENIED", action: "Mark as Violation" },
    ],
  },
  {
    type: "SSN Data",
    files: ["employees.xlsx"],
    eventsCount: 3,
    events: [
      { id: 5, date: "2024-12-04 09:12:45", source: "EXCEL", dest: "TEAMS", destination: "HR Channel", actionStatus: "DENIED", action: "Mark as Violation" },
      { id: 6, date: "2024-12-03 14:38:09", source: "WORD", dest: "EXCEL", destination: "excel_file.xlsx", actionStatus: "SUCCESS", action: "Mark as Violation" },
      { id: 7, date: "2024-12-02 11:22:18", source: "SHAREPOINT", dest: "WORD", destination: "sharepoint.com", actionStatus: "SUCCESS", action: "Mark as Violation" },
    ],
  },
  {
    type: "API Keys",
    files: [".env"],
    eventsCount: 5,
    events: [
      { id: 8, date: "2024-12-04 13:55:02", source: "VS CODE", dest: "TERMINAL", destination: "git push", actionStatus: "DENIED", action: "Mark as Violation" },
      { id: 9, date: "2024-12-04 10:38:44", source: "VS CODE", dest: "POSTMAN", destination: "api.stripe.com", actionStatus: "SUCCESS", action: "Mark as Violation" },
      { id: 10, date: "2024-12-03 17:45:19", source: "TERMINAL", dest: "VS CODE", destination: "internal_repo", actionStatus: "SUCCESS", action: "Mark as Violation" },
      { id: 11, date: "2024-12-02 09:15:33", source: "GITHUB", dest: "TERMINAL", destination: "github.com", actionStatus: "SUCCESS", action: "Mark as Violation" },
      { id: 12, date: "2024-12-01 14:29:05", source: "PASSWORD", dest: "VS CODE", destination: "local_config", actionStatus: "SUCCESS", action: "Mark as Violation" },
    ],
  },
  {
    type: "Bank Account Numbers",
    files: ["vendor_payments.xlsx"],
    eventsCount: 2,
    events: [
      { id: 13, date: "2024-12-04 08:45:12", source: "EXCEL", dest: "CHROME", destination: "webtransfer.com", actionStatus: "DENIED", action: "Mark as Violation" },
      { id: 14, date: "2024-12-03 15:38:22", source: "FINANCE FOLDER", dest: "EXCEL", destination: "local_copy", actionStatus: "SUCCESS", action: "Mark as Violation" },
    ],
  },
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

const getActionStatusStyle = (status: 'SUCCESS' | 'DENIED') => {
    if (status === 'DENIED') return { color: 'red', text: 'DENIED', icon: IconCircleX };
    return { color: 'teal', text: 'SUCCESS', icon: IconCircleCheck };
};
// --- END HELPERS ---

const DeviceDetail = () => {
//   const { id } = useParams();
  const [activeTab, setActiveTab] = useState<string | null>("sensitive");
  
  // 1. STATE MANAGEMENT: Track the IDs of selected items
  const [selectedItems, setSelectedItems] = useState<number[]>([]); 
//   const [_, setSelectedViolationIds] = useState<number[]>([]); 

  // Derived state to check if all visible items are selected
  const allSelected = selectedItems.length === sensitiveDataItems.length && sensitiveDataItems.length > 0;
  
  // HANDLERS for Sensitive Data
  const toggleAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      const allIds = sensitiveDataItems.map(item => item.id);
      setSelectedItems(allIds);
    }
  };

  const toggleItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };
  
  // Handlers for Violations Selection
//   const toggleViolationItem = (id: number) => {
//     setSelectedViolationIds(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
//   };

  // ACTION MODAL STATE AND HANDLERS
  const [actionModalOpened, { open: openActionModal, close: closeActionModal }] = useDisclosure(false);
  const [currentActionItem, setCurrentActionItem] = useState<any>(null); // Stores the item context
  const [currentActionType, setCurrentActionType] = useState<'confirm_violation' | 'mark_not_violation'>('confirm_violation'); 
  
  // Handler to trigger modal and set context
  const handleActionClick = (item: any, type: 'confirm_violation' | 'mark_not_violation') => {
      setCurrentActionItem(item);
      setCurrentActionType(type);
      openActionModal();
  };

  // Final Confirmation Handler (called after user clicks Confirm in the modal)
  const handleActionConfirm = () => {
      if (currentActionItem && currentActionType) {
          console.log(`Action: ${currentActionType} confirmed for item ID: ${currentActionItem.id}`);
          // Close modal after confirmation
          closeActionModal();
      }
  };
  
  const device = deviceData["dev-001"]; 
  const deviceStatus = getStatusColor(device.status);

  return (
    <>
    <Header />
    <Box 
        style={{ 
            minHeight: "100vh",
            width: "70%",
            // backgroundColor: "var(--mantine-color-dark-8)", 
            color: "white" 
        }}
    >
      {/* 1. ACTION MODAL PLACEMENT */}
      {currentActionItem && (
          <ActionConfirmationModal
              opened={actionModalOpened}
              onClose={closeActionModal}
              onConfirm={handleActionConfirm}
              actionType={currentActionType}
              // Contextual data extraction for the modal:
              titleContext={currentActionItem.type || 'Data Event'}
              details={[
                  `${currentActionItem.app} -> ${currentActionItem.destination}`,
                  `Data Type: ${currentActionItem.dataType}`,
                  `Time: ${currentActionItem.time}`,
              ].filter(Boolean)}
          />
      )}

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
            radius="md"
            mb="xl" 
        >
            <Tabs.List 
                style={{ backgroundColor: 'var(--mantine-color-dark-7)', 
                         padding: rem(4), 
                         borderRadius: rem(8), 
                         border: '1px solid var(--mantine-color-dark-4)'
            }}>
                <Tabs.Tab value="sensitive" fw={600} >Sensitive Data</Tabs.Tab>
                <Tabs.Tab value="violations" fw={600}>Violations ({device.violations})</Tabs.Tab>
                <Tabs.Tab value="traversal" fw={600}>Data Traversal ({device.dataEvents})</Tabs.Tab>
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
                        <Button size="sm" color="gray" leftSection={<IconFilter size={15} />}>
                            Filter
                        </Button>
                    </Group>

                    {/* Select All Row (Linked to state) */}
                    <Group p="sm" gap="sm" style={{ borderBottom: '1px solid var(--mantine-color-dark-4)', backgroundColor: 'var(--mantine-color-dark-6)' }}>
                        <Checkbox 
                            color="cyan" 
                            size="sm" 
                            ml="xs" 
                            checked={allSelected}
                            onChange={toggleAll}
                            indeterminate={selectedItems.length > 0 && !allSelected} 
                        />
                        <Text size="sm" c="dimmed">Select all ({selectedItems.length} selected)</Text>
                    </Group>

                    {/* List Items */}
                    <Stack gap={0}>
                        {sensitiveDataItems.map((item) => {
                            const severity = getSeverityStyle(item.severity);
                            const isSelected = selectedItems.includes(item.id);
                            
                            return (
                                <div 
                                    key={item.id} 
                                    style={{ 
                                        borderBottom: '1px solid var(--mantine-color-dark-4)', 
                                        padding: rem(16),
                                        // Highlight row when selected
                                        backgroundColor: isSelected ? 'var(--mantine-color-dark-6)' : 'transparent' 
                                    }}
                                >
                                    <Group align="flex-start" wrap="nowrap">
                                        <Checkbox 
                                            color="cyan" 
                                            mt={rem(4)} 
                                            size="sm"
                                            checked={isSelected} 
                                            onChange={() => toggleItem(item.id)}
                                        />
                                        
                                        {/* Icon Box */}
                                        <ThemeIcon size={42} radius="md" color="dark.4" variant="filled">
                                            <item.icon size={20} color="var(--mantine-color-gray-4)" />
                                        </ThemeIcon>
                                        
                                        <div style={{ flex: 1 }}>
                                            <Group gap="sm" mb={rem(4)}>
                                                <Text fw={600} size="sm" c="white">{item.name}</Text>
                                                <Badge 
                                                    variant="light" 
                                                    size="sm" 
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
                                            
                                            
                                                <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }} mb={rem(4)}>
                                                    {item.path}
                                                </Text>
                                            
                                            
                                            <Group gap={rem(8)}>
                                                {item.files.map((file) => (
                                                    <Badge 
                                                        key={file} 
                                                        color="gray" 
                                                        size="xs" 
                                                        radius="lg" 
                                                        style={{ textTransform: 'none', fontWeight: 500 }}
                                                    >
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
                        <Text size="sm" c="dimmed">Showing <span style={{color:'white'}}>1</span> to <span style={{color:'white'}}>4</span> of <span style={{color:'white'}}>7</span> results</Text>
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
                    
                    {/* Panel Header */}
                    <Stack p="md" gap={0} style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
                        <Text size="lg" fw={700} c="white">Policy Violations</Text>
                        <Text size="sm" c="dimmed">Data transfer attempts and policy breaches</Text>
                    </Stack>

                    {/* Violation Items List */}
                    <Stack gap={0}>
                        {violationItems.map((item, index) => {
                            const statusStyle = getViolationStatusStyle(item.status);
                            const IconComponent = item.icon; 
                            
                            return (
                                <div key={item.id}>
                                    <Group justify="space-between" p="md" align="center">
                                        
                                        {/* Left Side: Icon, Type, App, Destination, Time */}
                                        <Group gap={rem(16)} align="flex-start" wrap="nowrap">
                                            
                                            {/* ICON SLOT ADDED HERE */}
                                            <ThemeIcon size={42} radius="md" color="dark.4" variant="filled">
                                                <IconComponent size={20} color="var(--mantine-color-gray-5)" style={{ flexShrink: 0, marginTop: rem(2) }} />

                                            </ThemeIcon>
                                            
                                            <Stack gap={rem(2)}> {/* TIGHTENED GAP */}
                                                {/* Row 1: Type, via, App */}
                                                <Group gap="xs" style={{ marginBottom: rem(2) }}>
                                                    <Text fw={600} size="sm" c="white" style={{ lineHeight: 1 }}>{item.type}</Text>
                                                    <Text size="xs" c="dimmed">via</Text>
                                                    <Text size="sm" c="white" style={{ lineHeight: 1 }}>{item.app}</Text>
                                                </Group>
                                                
                                                {/* Row 2: Destination and Data Type */}
                                                <Text size="sm" c="dimmed" style={{ lineHeight: 1.2 }}>
                                                    {item.destination} • {item.dataType}
                                                </Text>
                                                
                                                {/* Row 3: Time */}
                                                <Text size="xs" c="dimmed">{item.time}</Text>
                                            </Stack>
                                        </Group>

                                        {/* Right Side: Badge and Button */}
                                        <Group>
                                            <Badge 
                                                color={statusStyle.color} 
                                                variant="light" 
                                                size="md" 
                                                radius="lg"
                                                leftSection={<statusStyle.icon size={12} />}
                                            >
                                                {statusStyle.text.toUpperCase()}
                                            </Badge>
                                            
                                            <Button 
                                                variant="subtle" 
                                                size="xs" 
                                                color="cyan"
                                                onClick={(e) => { e.stopPropagation(); handleActionClick(item, 'mark_not_violation'); }} // <-- NEW HANDLER
                                            >
                                                <Group gap={rem(6)}  style={{ height: '100%', alignItems: 'center' }}>
                                                    <IconShieldCheck size={15} color="cyan" style={{ flexShrink: 0 }}/>
                                                    <Text span size="xs" fw={600}>Not a Violation</Text>
                                                </Group>
                                            </Button>

                                        </Group>
                                    </Group>
                                    {index < violationItems.length - 1 && <Divider color="var(--mantine-color-dark-4)" />}
                                </div>
                            );
                        })}
                    </Stack>
                    
                    {/* Pagination Footer - Added for structural completeness */}
                    <Group justify="space-between" mt="lg" p="md" style={{ borderTop: '1px solid var(--mantine-color-dark-4)' }}>
                        <Text size="sm" c="dimmed">Showing <span style={{color:'white'}}>1</span> to <span style={{color:'white'}}>4</span> of <span style={{color:'white'}}>6</span> results</Text>
                        <Group gap={5}>
                            <ActionIcon variant="default" size="sm" disabled><IconChevronRight size={14} style={{transform: 'rotate(180deg)'}} /></ActionIcon>
                            <Button size="xs" variant="filled" color="cyan">1</Button>
                            <Button size="xs" variant="default">2</Button>
                            <ActionIcon variant="default" size="sm"><IconChevronRight size={14} /></ActionIcon>
                        </Group>
                    </Group>
                </Paper>
            </Tabs.Panel>


            {/* --- TAB 3: DATA TRAVERSAL --- */}
            <Tabs.Panel value="traversal" mt="md">
                <Paper withBorder radius="md" style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)' }}>
                    
                    {/* Panel Header */}
                    <Stack p="md" gap={0} style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
                        <Text size="lg" fw={700} c="white">Data Traversal Timeline</Text>
                        <Text size="sm" c="dimmed">Track how sensitive data has moved across applications and websites over time</Text>
                    </Stack>

                    {/* Grouped Timeline Content */}
                    <Stack gap={0} p="md">
                        {dataTraversalGroups.map((group, groupIndex) => (
                            <div key={group.type} style={{ paddingBottom: rem(20), paddingTop: rem(20), borderBottom: groupIndex < dataTraversalGroups.length - 1 ? '1px solid var(--mantine-color-dark-4)' : 'none' }}>
                                
                                {/* Group Header (e.g., Credit Card Numbers) */}
                                <Group justify="space-between" mb="sm">
                                    <Text size="lg" fw={600} c="white">{group.type}</Text>
                                    <Text size="sm" c="dimmed" fw={500}>{group.files[0]}</Text>
                                    <Text size="sm" c="dimmed">{group.eventsCount} events</Text>
                                </Group>
                                
                                {/* Events List */}
                                <Stack gap={rem(12)} mt="md">
                                    {group.events.map((event) => {
                                        const actionStatus = getActionStatusStyle(event.actionStatus as 'SUCCESS' | 'DENIED');
                                        
                                        return (
                                            <Group key={event.id} justify="space-between" align="flex-start" wrap="nowrap">
                                                
                                                {/* Left Column: Date & Source/Destination */}
                                                <Stack gap={rem(4)} style={{ width: '60%' }}>
                                                    <Text size="xs" c="dimmed" fw={500}>{event.date}</Text>
                                                    
                                                    {/* Source/Destination Pills (Inline Flow) */}
                                                    <Group gap={rem(8)} wrap="nowrap">
                                                        {/* Source App */}
                                                        <Badge variant="outline" size="xs" color="cyan" style={{ textTransform: 'uppercase', fontWeight: 500 }}>
                                                            {event.source}
                                                        </Badge>
                                                        <IconArrowRight size={14} color="var(--mantine-color-gray-5)" />
                                                        {/* Destination App/Service */}
                                                        <Badge variant="outline" size="xs" color="cyan" style={{ textTransform: 'none', fontWeight: 500 }}>
                                                            {event.dest}
                                                        </Badge>
                                                        {/* Destination Link/Location (Muted Text) */}
                                                        <Text size="xs" c="dimmed">{event.destination}</Text>
                                                    </Group>
                                                </Stack>

                                                {/* Right Column: Action Status & Mark as Violation Button */}
                                                <Group gap="xs" align="center" wrap="nowrap" style={{ width: '40%', justifyContent: 'flex-end' }}>
                                                    <Badge 
                                                        variant="light" 
                                                        size="sm" 
                                                        color={actionStatus.color} 
                                                        radius="md"
                                                        leftSection={<actionStatus.icon size={12} />}
                                                        style={{ minWidth: rem(80), justifyContent: 'center', textTransform: 'uppercase', fontWeight: 500 }}
                                                    >
                                                        {actionStatus.text}
                                                    </Badge>
                                                    
                                                    <Button 
                                                        variant="subtle" 
                                                        size="xs" 
                                                        color="red"
                                                        onClick={() => handleActionClick(event, 'confirm_violation')} // <-- FUNCTIONAL FIX
                                                    >
                                                        <Group gap={rem(6)}  style={{ height: '100%', alignItems: 'center' }}>
                                                            <IconShieldX size={15} color="red" style={{ flexShrink: 0 }}/>
                                                            {event.action}
                                                        </Group>
                                                    </Button>
                                                </Group>
                                            </Group>
                                        );
                                    })}
                                </Stack>
                            </div>
                        ))}
                    </Stack>
                    
                    {/* Pagination Footer */}
                    <Group justify="space-between" p="md" style={{ borderTop: '1px solid var(--mantine-color-dark-4)' }}>
                        <Text size="sm" c="dimmed">Showing <span style={{color:'white'}}>1</span> to <span style={{color:'white'}}>4</span> of <span style={{color:'white'}}>14</span> results</Text>
                        <Group gap={5}>
                            <ActionIcon variant="default" size="sm" disabled><IconChevronRight size={14} style={{transform: 'rotate(180deg)'}} /></ActionIcon>
                            <Button size="xs" variant="filled" color="cyan">1</Button>
                            <Button size="xs" variant="default">2</Button>
                            <Button size="xs" variant="default">3</Button>
                            <Button size="xs" variant="default">4</Button>
                            <ActionIcon variant="default" size="sm"><IconChevronRight size={14} /></ActionIcon>
                        </Group>
                    </Group>
                </Paper>
            </Tabs.Panel>
        </Tabs>

      </Container>
    
    </Box>
    </>
  );
};

export default DeviceDetail;