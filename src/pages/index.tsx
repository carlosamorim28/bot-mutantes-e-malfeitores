// pages/index.tsx (ou app/page.tsx se estiver usando App Router)
import { useEffect, useState } from 'react';





export default function HomePage() {
  // Estados para armazenar os valores dos inputs
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<{
    input1: string;
    input2: string;
  } | null>(null);


  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData({
      input1,
      input2
    });

    fetch('/api/send-discord-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({input1, input2}),
    });
    
    // sendMessage(input1, input2)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulário com Dois Inputs</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="input1" className="block mb-2">
            Bônus da jogada:
          </label>
          <input
            type="number"
            id="input1"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="input2" className="block mb-2">
            Dificuldade:
          </label>
          <input
            type="number"
            id="input2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded max-w-md">
          <h2 className="text-xl font-semibold mb-2">Dados Enviados:</h2>
          <p>Primeiro Input: {submittedData.input1}</p>
          <p>Segundo Input: {submittedData.input2}</p>
        </div>
      )}
    </div>
  );
}


