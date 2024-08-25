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

interface CursoData {
  nome: string;
  faculdade: string;
  ano: number;
  notaDeCorte: number;
}

const CreateCursoDialog = () => {
  // Define states for each input field
  const [nome, setNome] = useState<string>('');
  const [faculdade, setFaculdade] = useState<string>('');
  const [ano, setAno] = useState<number | ''>('');
  const [notaDeCorte, setNotaDeCorte] = useState<number | ''>('');
  const [open, setOpen] = useState<boolean>(false); // State to manage dialog visibility

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    // Construct the data object with the correct format
    const data: CursoData = {
      nome,
      faculdade,
      ano: Number(ano), // Ensure ano is a number
      notaDeCorte: Number(notaDeCorte) // Ensure notaDeCorte is a number
    };

    if(!nome || !faculdade || !ano || !notaDeCorte) {
      return alert("preencha todos os dados")
    }

    console.log('Submitting data:', data); // Debug: Print data to be sent

    try {
      const response = await axios.post('http://localhost:9090/cad-curso', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        // Handle successful response
        alert('Curso adicionado com sucesso!');
        setOpen(false); // Close the dialog
        window.location.reload(); // Reload the page to update the list of courses
        // Clear the form fields
        setNome('');
        setFaculdade('');
        setAno('');
        setNotaDeCorte('');
      } else {
        // If the response status is not 200, show an error alert
        alert('Falha ao adicionar curso. Status inesperado.');
      }
    } catch (error: any) {
      // Handle error
      console.error('Failed to add curso:', error);
      alert('Falha ao adicionar curso.');
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
            Adicione novos cursos e sua nota de corte no sistema aqui.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome do curso
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
            <Label htmlFor="faculdade" className="text-right">
              Faculdade
            </Label>
            <Input
              id="faculdade"
              name="faculdade"
              value={faculdade}
              onChange={(e) => setFaculdade(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ano" className="text-right">
              Ano
            </Label>
            <Input
              id="ano"
              name="ano"
              type="number"
              value={ano === '' ? '' : ano}
              onChange={(e) => setAno(e.target.value === '' ? '' : Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notaDeCorte" className="text-right">
              Nota de corte
            </Label>
            <Input
              id="notaDeCorte"
              name="notaDeCorte"
              type="number"
              value={notaDeCorte === '' ? '' : notaDeCorte}
              onChange={(e) => setNotaDeCorte(e.target.value === '' ? '' : Number(e.target.value))}
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

export default CreateCursoDialog;
