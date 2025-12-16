import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-500/20 dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:shadow-brand-500/20 shadow-sm dark:shadow-none">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 opacity-0" />
      
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
          {icon}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
};

export default CategoryCard;
