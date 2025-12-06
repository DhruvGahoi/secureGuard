import { IconBell, IconSettings, IconUser, IconLogout, IconShield } from "@tabler/icons-react";
import { Box, Container, Group, Text, Avatar, ActionIcon, Menu, rem } from "@mantine/core";

const Header = () => {
    return (
        <Box 
        
            style={{ 
                backgroundColor: 'var(--mantine-color-dark-8)', 
                borderBottom: '1px solid var(--mantine-color-dark-4)',
                width: '100%'
            }}
        >
            <Container size="xl" py="xs">
                <Group justify="space-between" h={50}>
                    <Group gap="xs">
                        <IconShield size={26} color="cyan" />
                        <Text size="xl" fw={700} c="white">SecureGuard</Text>
                    </Group>

                    <Group gap="md">
                        <ActionIcon variant="transparent" color="gray"><IconBell size={20} /></ActionIcon>
                        <ActionIcon variant="transparent" color="gray"><IconSettings size={20} /></ActionIcon>
                        
                        <Menu 
                            shadow="md" 
                            width={200} 
                            position="bottom-end" 
                            trigger="click" 
                        >
                            <Menu.Target>
                                <Group 
                                    gap="xs" 
                                    style={{ cursor: 'pointer', paddingRight: rem(8) }} 
                                >
                                    <Avatar radius="xl" size="sm" color="blue" style={{ background: 'var(--mantine-color-dark-6)'}}>JD</Avatar> 
                                    <Text size="sm" c="white" fw={500}>John Doe</Text>
                                </Group>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item 
                                    leftSection={<IconUser size={14} />} 
                                    onClick={() => console.log('Go to Profile')} 
                                >
                                    Profile
                                </Menu.Item>
                                
                                <Menu.Item 
                                    leftSection={<IconSettings size={14} />}
                                    onClick={() => console.log('Go to Settings')}
                                >
                                    Settings
                                </Menu.Item>

                                <Menu.Divider />

                                <Menu.Item 
                                    color="red" 
                                    leftSection={<IconLogout size={14} />}
                                    onClick={() => console.log('Logging Out')}
                                >
                                    Log out
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </Container>
        </Box>
    );
};

export default Header;