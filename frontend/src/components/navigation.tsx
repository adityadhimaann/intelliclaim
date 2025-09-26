import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { useTheme } from './theme-provider';
import { 
  Brain,
  LayoutDashboard,
  FileText,
  Workflow,
  Eye,
  Settings,
  Moon,
  Sun,
  LogOut,
  Sparkles,
  Activity,
  Menu,
  X,
  TestTube
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onBackToLanding: () => void;
  onLogout?: () => void;
  isTrialUser?: boolean;
  onUpgrade?: () => void;
}

export function Navigation({ currentPage, onPageChange, onBackToLanding, onLogout, isTrialUser, onUpgrade }: NavigationProps) {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      badge: null
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileText className="w-5 h-5" />,
      badge: '3'
    },
    {
      id: 'workflows',
      label: 'Workflows',
      icon: <Workflow className="w-5 h-5" />,
      badge: null
    },
    {
      id: 'vision',
      label: 'Vision',
      icon: <Eye className="w-5 h-5" />,
      badge: 'NEW'
    },
    {
      id: 'test-backend',
      label: 'Test Backend',
      icon: <TestTube className="w-5 h-5" />,
      badge: 'DEV'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      badge: null
    }
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const NavigationContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? 'h-full' : 'h-full'} bg-gradient-to-b from-background to-background/95 backdrop-blur-sm flex flex-col`}>
      {/* Logo */}
      <motion.div
        className="p-6 border-b border-border/50"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => {
          onBackToLanding();
          if (isMobile) setIsMobileMenuOpen(false);
        }}>
          <div className="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#8B5CF6] rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#0066FF] to-[#8B5CF6] bg-clip-text text-transparent">
              IntelliClaim
            </h2>
            <p className="text-xs text-muted-foreground">
              {isTrialUser ? 'Free Trial Active' : 'AI Insurance Platform'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status & Trial Banner */}
      <div className="px-6 py-4 space-y-3">
        {isTrialUser && (
          <motion.div
            className="p-3 bg-gradient-to-r from-[#FF6B35]/10 to-[#FF1744]/10 border border-[#FF6B35]/20 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm font-medium">Free Trial</span>
            </div>
            <Button
              size="sm"
              onClick={() => {
                onUpgrade?.();
                if (isMobile) setIsMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF1744] hover:from-[#E55A2B] hover:to-[#DC143C] text-white"
            >
              Upgrade Now
            </Button>
          </motion.div>
        )}
        
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#00FF88]/10 to-[#00D4AA]/10 border border-[#00FF88]/20 rounded-lg">
          <div className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse" />
          <span className="text-sm font-medium">AI Systems Active</span>
          <Activity className="w-4 h-4 text-[#00FF88] ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-4 space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handlePageChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-[#0066FF]/10 to-[#8B5CF6]/10 border border-[#0066FF]/20 text-[#0066FF] dark:text-[#06B6D4]'
                : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={currentPage === item.id ? 'text-[#0066FF] dark:text-[#06B6D4]' : ''}>
              {item.icon}
            </span>
            <span className="font-medium flex-1">{item.label}</span>
            {item.badge && (
              <Badge 
                variant={item.badge === 'NEW' ? 'default' : 'secondary'}
                className={
                  item.badge === 'NEW' 
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white px-2 py-1 text-xs'
                    : 'bg-muted text-muted-foreground px-2 py-1 text-xs'
                }
              >
                {item.badge}
              </Badge>
            )}
          </motion.button>
        ))}
      </nav>

      {/* AI Assistant */}
      <div className="px-6 py-4">
        <motion.div
          className="p-4 bg-gradient-to-r from-[#8B5CF6]/10 to-[#06B6D4]/10 border border-[#8B5CF6]/20 rounded-xl cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">AI Assistant</span>
          </div>
          <p className="text-xs text-muted-foreground">Ask me anything about your claims</p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="p-6 border-t border-border/50 space-y-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full justify-start"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            (onLogout || onBackToLanding)();
            if (isMobile) setIsMobileMenuOpen(false);
          }}
          className="w-full justify-start text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {isTrialUser ? 'Exit Trial' : 'Sign Out'}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-gradient-to-r from-background to-background/95 border-b border-border/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0066FF] to-[#8B5CF6] rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-bold bg-gradient-to-r from-[#0066FF] to-[#8B5CF6] bg-clip-text text-transparent">
            IntelliClaim
          </h2>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" aria-label="Open navigation menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate through the IntelliClaim application sections
            </SheetDescription>
            <NavigationContent isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex w-72 bg-gradient-to-b from-background to-background/95 border-r border-border/50 backdrop-blur-sm flex-col"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <NavigationContent />
      </motion.aside>
    </>
  );
}