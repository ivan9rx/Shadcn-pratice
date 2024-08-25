import { useState, FormEvent } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UserData {
  nome: string;
  email: string;
  senha: string;
  nivelacesso: string;
}

const CreateUserDialog = () => {
  // Define states for each input field
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [nivelacesso, setNivelAcesso] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false); // State to manage dialog visibility

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    // Construct the data object with the correct format
    const data: UserData = {
      nome,
      email,
      senha,
      nivelacesso
    };

    if (!nome || !email || !senha || !nivelacesso) {
      return alert("preencha todos os dados")
    }

    console.log('Submitting data:', data); // Debug: Print data to be sent

    try {
      const response = await axios.post('http://localhost:9090/cad-usuario', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        // Handle successful response
        alert('Usuário adicionado com sucesso!');
        setOpen(false); // Close the dialog
        window.location.reload(); // Reload the page to update the list of courses
        // Clear the form fields
        setNome('');
        setEmail('');
        setSenha('');
        setNivelAcesso('');
      } else {
        // If the response status is not 200, show an error alert
        alert('Falha ao adicionar usuário. Status inesperado.');
      }
    } catch (error: any) {
      // Handle error
      console.error('Failed to add user:', error);
      alert('Falha ao adicionar usuário.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>Novo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar curso</DialogTitle>
          <DialogDescription>
            Adicione novos usuários no sistema aqui.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome do usuário
            </Label>
            <Input
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="senha" className="text-right">
              Senha
            </Label>
            <Input
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nivelacesso" className="text-right">
              Nivel de acesso
            </Label>
            <Input
              id="nivelacesso"
              name="nivelacesso"
              value={nivelacesso}
              onChange={(e) => setNivelAcesso(e.target.value)}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateUserDialog;
