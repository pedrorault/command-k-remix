import type { MetaFunction } from '@remix-run/node';
import { Link, useNavigate } from '@remix-run/react';

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '~/components/ui/command';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'p' && !e.metaKey && !e.ctrlKey && !e.shiftKey && !open) {
        e.preventDefault();
        navigate('/profiles');
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Command K</h1>
      <p className="text-lg text-muted-foreground">
        Press{' '}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono  font-medium text-muted-foreground opacity-100">
          Ctrl+K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Digite um comando ou busque..."
          value={input}
          onValueChange={(e) => setInput(e)}
        />
        {/* loop precisa ser adicionado no componente do shadcn */}
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Locais">
            {/* Ver sobre pages e nested items */}
            {/* https://github.com/pacocoursey/cmdk?tab=readme-ov-file#nested-items */}
            <CommandItem>Buscar local por cidade</CommandItem>
            <CommandItem onSelect={() => setInput('CEP=')}>
              Buscar local por CEP
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Configurações">
            <CommandItem onSelect={() => navigate('/profiles')}>
              Profile
              <CommandShortcut>P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
