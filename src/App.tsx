import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// Static portfolio: no query, toast or tooltip consumers in the page tree.
const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vietanh-portfolio-theme">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
export default App;
