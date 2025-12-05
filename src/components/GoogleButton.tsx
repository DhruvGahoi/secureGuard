import { Button, type ButtonProps } from "@mantine/core";
import { GoogleIcon } from "../assets/GoogleIcon";

export function GoogleButton(props: ButtonProps) {
  return (
    <Button
      variant="outline"
      leftSection={<GoogleIcon />}
      radius="md"
      fw={500}
      {...props}
      fullWidth
      size="md"
      styles={{
        root: {
          backgroundColor: "#242728",
          borderColor: "#2A2A2A",
          color: "#fff",
          textAlign: "center",
        },
      }}
      {...props}
    />
  );
}
