export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Meridian E-commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
