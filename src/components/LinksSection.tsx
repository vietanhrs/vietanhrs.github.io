import {
  Github,
  Facebook,
  Twitter,
  Instagram,
  ExternalLink,
} from "lucide-react";

interface SocialLink {
  name: string;
  username: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Custom icons for platforms not in lucide
const CodeForcesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
  </svg>
);

const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const TwitchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
  </svg>
);

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    username: "vietanhrs",
    url: "https://github.com/vietanhrs",
    icon: Github,
    color: "hover:text-foreground",
  },
  {
    name: "Facebook",
    username: "Trần Việt Anh",
    url: "https://www.facebook.com/tv.anh2k/",
    icon: Facebook,
    color: "hover:text-[#1877F2]",
  },
  {
    name: "Twitter",
    username: "@tr_vietanh",
    url: "https://x.com/tr_vietanh",
    icon: Twitter,
    color: "hover:text-foreground",
  },
  {
    name: "Instagram",
    username: "@println_anh.tv",
    url: "https://www.instagram.com/println_anh.tv/",
    icon: Instagram,
    color: "hover:text-[#E4405F]",
  },
  {
    name: "CodeForces",
    username: "anhtv2710",
    url: "https://codeforces.com/profile/anhtv2710",
    icon: CodeForcesIcon,
    color: "hover:text-[#1F8ACB]",
  },
  {
    name: "LeetCode",
    username: "vietanhtranuet",
    url: "https://leetcode.com/u/vietanhtranuet/",
    icon: LeetCodeIcon,
    color: "hover:text-[#FFA116]",
  },
  {
    name: "Twitch",
    username: "cplusplus2710",
    url: "https://www.twitch.tv/cplusplus2710",
    icon: TwitchIcon,
    color: "hover:text-[#9146FF]",
  },
];

export function LinksSection() {
  return (
    <section id="links" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="syntax-keyword">import</span>{" "}
            <span className="text-muted-foreground">{"{"}</span>
            <span className="syntax-variable"> connect </span>
            <span className="text-muted-foreground">{"}"}</span>{" "}
            <span className="syntax-keyword">from</span>{" "}
            <span className="syntax-string">"./social"</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            <span className="syntax-comment">
              // Let's connect across the internet
            </span>
          </p>
        </div>

        {/* Links Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-4`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center transition-colors ${link.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold group-hover:text-primary transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-mono truncate">
                    {link.username}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
