import type { MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

import { useEffect, useState } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
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
  const [searchType, setSearchType] = useState<{ resourceType: "Local" | "Pessoa", resourceParam: string } | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
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
          searchType={searchType}
          onKeyUp={(e) => {
            if (e.key == 'Backspace' && searchType !== null) {
              setSearchType(null)
            }
          }}
          onValueChange={(e) => setInput(e)}
        />
        {searchType === null ? (
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Locais">
              <CommandItem onSelect={() => setSearchType({ resourceType: "Local", resourceParam: "Cidade" })}>Buscar local por cidade</CommandItem>
              <CommandItem onSelect={() => setSearchType({ resourceType: "Local", resourceParam: "CEP" })}>
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
          </CommandList>) : (
          <CommandList><CommandEmpty>Buscando em {searchType.resourceType} por {searchType.resourceParam}</CommandEmpty></CommandList>
        )}
      </CommandDialog>
    </div>
  );
}
