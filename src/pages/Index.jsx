import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"

const Index = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Random Quote Generator</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          ) : (
            <>
              <p className="text-xl italic mb-4">"{quote?.content}"</p>
              <p className="text-sm font-semibold">- {quote?.author}</p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={fetchQuote} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" /> New Quote
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
