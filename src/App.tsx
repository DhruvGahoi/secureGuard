import "@mantine/core/styles.css";
import { MantineProvider, Flex } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "./utils/mantine-theme";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DeviceDetail from "./pages/DeviceDetail";
// import Header from "./components/Header";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* FIX: Set defaultColorScheme to "dark" to enable the correct dark mode styles */}
      <MantineProvider theme={theme} defaultColorScheme="dark" >
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{
            minHeight: "100vh",
            width: "100vw",
            background: "var(--mantine-color-dark-9)", 
          }}
        >
          {/* <Header /> */}
          <BrowserRouter>
            <Routes>
              
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/device/:id" element={<DeviceDetail />} />
            </Routes>
          </BrowserRouter>
        </Flex>
      </MantineProvider>
    </QueryClientProvider>
  );
}