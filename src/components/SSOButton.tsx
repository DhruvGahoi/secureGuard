import { Button } from "@mantine/core";

export function SSOButton({ ...props }) {
  return (
    <Button
      fullWidth
      size="md"
      radius="md"
      fw={600}
      {...props}
      styles={{
        root: {
          backgroundColor: "#0c8599",
        },
      }}
    >
      Sign in with SSO
    </Button>
  );
}
