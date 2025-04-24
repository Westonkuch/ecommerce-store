import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-600">
      
      <h1 className="text-4xl font-bold text-blue-400">Disc Golf Ecommerce Store</h1>

      <main className="flex flex-col gap-8 row-start-2 items-center max-w-3xl text-white">
        <p className="text-lg text-center leading-relaxed">
          This full-stack ecommerce store was built using <strong>Next.js (App Router)</strong>, 
          <strong> TypeScript</strong>, <strong>Prisma</strong> for the database ORM, and <strong>PostgreSQL</strong>.
          I implemented dynamic routing for individual product pages, API routes to fetch product data, and a cart system 
          using <strong>React context</strong>. Styling was handled with <strong>Tailwind CSS</strong>, and the site 
          is responsive across devices. Through this project, I gained experience in both frontend and backend 
          development, and learned how to manage client/server boundaries in Next.js.
        </p>

        <Link
          href="/disc-golf-store"
          className="mt-4 text-lg font-semibold text-white bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Visit Disc Golf Store
        </Link>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"].map((tech) => (
            <span
              key={tech}
              className="bg-white/10 border border-white/20 px-4 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          GitHub Repo
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-white"
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Learn more about Next.js
        </a>
      </footer>
    </div>
  );
}
