import { Card, Group, Text, ThemeIcon, rem} from "@mantine/core";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
}

const StatCard = ({ title, value, icon, color = "blue" }: StatCardProps) => {
    return (
        <Card 
            padding="lg" 
            radius="md" 
            withBorder 
            style={{ backgroundColor: 'var(--mantine-color-dark-7)', borderColor: 'var(--mantine-color-dark-4)', }}
        >
            <Group justify="space-between" align="flex-start">
                <div>
                    <Text size="xs" c="dimmed" fw={500} mb={5}>
                        {title}
                    </Text>
                    <Text fw={300} c="white" style={{ fontSize: rem(20), lineHeight: 1 }}>
                        {value}
                    </Text>
                </div>
                <ThemeIcon 
                    color={color} 
                    variant="light" 
                    size="xl" 
                    radius="md"
                    style={{ width: rem(48), height: rem(48) }}
                >
                    {icon}
                </ThemeIcon>
            </Group>
        </Card>
    );
};

export default StatCard;