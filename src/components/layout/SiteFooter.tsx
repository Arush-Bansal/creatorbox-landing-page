type SiteFooterProps = {
  releasePageUrl: string
}

export function SiteFooter({ releasePageUrl }: SiteFooterProps) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-background/80 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} CreatorBox</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={releasePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            GitHub Releases
          </a>
          <a
            href="https://arushnerdsout.com/work/creatorbox"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            Technical reads
          </a>
        </div>
      </div>
    </footer>
  )
}
