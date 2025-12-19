import { Badge } from "@/components/ui/badge";
import { Laptop, Keyboard, Cpu, HardDrive, MemoryStick, Gamepad2 } from "lucide-react";

interface Laptop {
  name: string;
  os: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
}

interface KeyboardItem {
  name: string;
  details?: string;
}

interface IoTItem {
  name: string;
  description: string;
}

const laptops: Laptop[] = [
  {
    name: "ASUS Vivobook S 14",
    os: "OpenSUSE Leap 16.0",
    cpu: "Intel Core Ultra 5 225H (14 cores)",
    ram: "32 GiB",
    storage: "474.4GB SSD",
    gpu: "Mesa Intel Graphics",
  },
  {
    name: "Acer Nitro V",
    os: "Debian 12 Bookworm",
    cpu: "13th Gen Intel Core i7-13620H (16 threads)",
    ram: "16.0 GiB",
    storage: "512GB SSD",
    gpu: "NVIDIA GeForce RTX 2050",
  },
  {
    name: "Dell Vostro 3405",
    os: "Debian 12 Bookworm",
    cpu: "AMD Ryzen 7 3700U",
    ram: "13.5 GiB",
    storage: "640.1GB SSD",
    gpu: "Radeon Vega 10 Mobile Gfx",
  },
];

const keyboards: KeyboardItem[] = [
  { name: "Sofle V2", details: "Akko Cream V3 Pro Fairy Silent • Linear / Pre-lubed / 55g • Minimalist Black PBT Keycaps" },
  { name: "Leopold FC660M BT" },
  { name: "AKKO 3098 RF Dracula Castle" },
  { name: "AKKO 3108 RF White on Black" },
  { name: "Corsair K63 Wireless Blue" },
  { name: "Logitech Wave Keys" },
  { name: "Dareu EK807G" },
];

const iotItems: IoTItem[] = [
  { name: "Zoom:Bit Robot", description: "Reka:Bit + Micro:bit V2" },
  { name: "Wear:Bit Watch", description: "Micro:bit V2" },
];

export function GearSection() {
  return (
    <section id="gear" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="syntax-keyword">export</span>{" "}
            <span className="syntax-keyword">default</span>{" "}
            <span className="syntax-function">MyGear</span>
            <span className="text-muted-foreground">()</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            <span className="syntax-comment">// The tools that power my work</span>
          </p>
        </div>

        {/* Laptops */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Laptop className="w-5 h-5 text-primary" />
            <span className="syntax-variable">laptops</span>
            <span className="text-muted-foreground font-mono text-sm">// {laptops.length} machines</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {laptops.map((laptop, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Laptop className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">{laptop.name}</h4>
                    <Badge variant="outline" className="font-mono text-xs mt-1">
                      {laptop.os}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-syntax-function" />
                    <span className="text-muted-foreground">{laptop.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MemoryStick className="w-4 h-4 text-syntax-string" />
                    <span className="text-muted-foreground">{laptop.ram}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-syntax-variable" />
                    <span className="text-muted-foreground">{laptop.storage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{laptop.gpu}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keyboards */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-accent" />
            <span className="syntax-variable">keyboards</span>
            <span className="text-muted-foreground font-mono text-sm">// {keyboards.length} boards</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyboards.map((kb, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <Keyboard className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-mono font-medium">{kb.name}</h4>
                    {kb.details && (
                      <p className="text-muted-foreground text-xs mt-1">{kb.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IoT */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-syntax-string" />
            <span className="syntax-variable">iotDevices</span>
            <span className="text-muted-foreground font-mono text-sm">// embedded</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {iotItems.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 hover:border-syntax-string/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-syntax-string/10 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-5 h-5 text-syntax-string" />
                  </div>
                  <div>
                    <h4 className="font-mono font-medium">{item.name}</h4>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
