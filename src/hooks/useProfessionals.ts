import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Professional } from "@/data/professionals";

export function useProfessionals() {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("professionals").select("*");
      if (error) throw error;
      return data as Professional[];
    },
  });
}

export function useProfessional(id: string) {
  return useQuery({
    queryKey: ["professionals", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Professional;
    },
    enabled: !!id,
  });
}
