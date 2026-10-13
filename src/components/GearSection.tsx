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
    name: "Acer Nitro V",
    os: "CachyOS",
    cpu: "13th Gen Intel Core i7-13620H (16 threads)",
    ram: "16.0 GiB",
    storage: "512GB + 1TB SSD",
    gpu: "NVIDIA GeForce RTX 2050",
  },
  {
    name: "Dell Vostro 3405",
    os: "OpenSUSE Leap",
    cpu: "AMD Ryzen 7 3700U",
    ram: "13.5 GiB",
    storage: "640.1GB SSD",
    gpu: "Radeon Vega 10 Mobile Gfx",
  },
];

const keyboards: KeyboardItem[] = [
  {
    name: "Sofle V2",
    details:
      "Akko Cream V3 Pro Fairy Silent • Linear / Pre-lubed / 55g • Minimalist Black PBT Keycaps",
  },
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
    <section
      id="gear"
      tabIndex={-1}
      className="shell section uses"
      aria-labelledby="gear-title"
    >
      <div>
        <h2 id="gear-title">My gear</h2>
        <p className="uses-intro">
          The machines, keyboards and embedded devices I use.
        </p>
        <div className="gear-grid">
          {laptops.map((laptop) => (
            <article key={laptop.name}>
              <h3>{laptop.name}</h3>
              <dl>
                {Object.entries(laptop)
                  .filter(([key]) => key !== "name")
                  .map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
              </dl>
            </article>
          ))}
        </div>
        <h3>Keyboards</h3>
        <ul className="keyboard-list">
          {keyboards.map((kb) => (
            <li key={kb.name}>
              {kb.name}
              {kb.details && <p>{kb.details}</p>}
            </li>
          ))}
        </ul>
        <h3>Embedded devices</h3>
        <ul>
          {iotItems.map((item) => (
            <li key={item.name}>
              {item.name} — {item.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
