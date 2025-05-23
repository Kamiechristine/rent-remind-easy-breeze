
import React from 'react';
import { Bell, Calendar, Home, Users, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Calendar size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RentReminder Pro</h1>
              <p className="text-sm text-gray-500">Property Management System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Admin Navigation Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Dashboard</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                          >
                            <Calendar className="h-6 w-6 text-white" />
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              RentReminder Pro
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Manage tenant information and automate rent reminders efficiently
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem to="/" title="Tenants" icon={<Users className="w-4 h-4 mr-2" />}>
                        View and manage tenant information
                      </ListItem>
                      <ListItem to="/" title="Reports" icon={<FileText className="w-4 h-4 mr-2" />}>
                        Access payment history and analytics
                      </ListItem>
                      <ListItem to="/" title="Settings" icon={<Settings className="w-4 h-4 mr-2" />}>
                        Configure system preferences
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                    <Home size={16} className="mr-1" /> Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                    <Users size={16} className="mr-1" /> Tenants
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Admin Avatar */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
