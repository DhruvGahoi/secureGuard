import { Button, type ButtonProps } from "@mantine/core";
import { GoogleIcon } from "../assets/GoogleIcon";
import React from "react";

// 1. Create a type that combines Mantine props + Standard HTML button props
type GoogleButtonProps = ButtonProps & React.ComponentPropsWithoutRef<"button">;

// 2. Use this new type for your props
export function GoogleButton(props: GoogleButtonProps) {
  return (
    <Button
      variant="outline"
      leftSection={<GoogleIcon />}
      radius="md"
      fw={500}
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
      // 3. Spread props at the end to allow overrides and pass onClick through
      {...props}
    />
  );
}