
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { GoogleButton } from "../components/GoogleButton";
import { SSOButton } from "../components/SSOButton";
import { Card, Stack, Title, Text, Center, Box, Divider, Group } from "@mantine/core";
import { IconShield } from "@tabler/icons-react";

// TODO : Fix the sheild and the font family

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/dashboard");

  return (
    <Box
      w="100%"
      h="100vh"
      style={{
        backgroundColor: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack gap="xl" align="center">
        
        {/* Logo */}
        <Group gap="md" mb="md">
          <Center 
            w={56} 
            h={56} 
            bg="#0c8599" 
            style={{ borderRadius: "14px" }}
          >
            <IconShield size={30} strokeWidth={1.4} color="#66d9e8" />
          </Center>

          <Stack gap={2}>
            <Title order={2} fw={600} c="white">SecureGuard</Title>
            <Text size="sm" c="dimmed">Data Loss Prevention</Text>
          </Stack>
        </Group>

        {/* Card */}
        <Card
          shadow="none"
          p="xl"
          radius="lg"
          w={500}
          style={{ 
            backgroundColor: "#1e2122",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <Stack gap="lg">
            <Box ta="center">
              <Title order={3} fw={600} c="white">Welcome back</Title>
              <Text size="sm" c="dimmed">
                Sign in to access your DLP dashboard
              </Text>
            </Box>

            <GoogleButton onClick={handleLogin} fullWidth>Continue with Google</GoogleButton>

            <Divider label="or" labelPosition="center" color="rgba(255, 255, 255, 0.2)" />

            <SSOButton fullWidth onClick={handleLogin} />
          </Stack>
        </Card>

        {/* Footer */}
        <Group gap={6}>
          <Lock size={12} color="rgba(255, 255, 255, 0.5)" />
          <Text size="xs" c="dimmed">
            Enterprise-grade security with end-to-end encryption
          </Text>
        </Group>
      </Stack>
    </Box>
  );
};

export default Login;