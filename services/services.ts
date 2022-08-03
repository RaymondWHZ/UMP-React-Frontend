import {useToast} from "@chakra-ui/react";
import useSWR from "swr";
import request from "@/utils/request";

export function useUserInfo() {
  const toast = useToast();
  const { data, error } = useSWR('/user-info', async () => {
    try {
      const res = await request.post('/user-info');
      return res.data;
    } catch (e) {
      toast({
        title: 'Failed to load user data.',
        description: "Please reload the page to try again.",
        status: 'error'
      })
    }
  })
  return {
    data,
    error,
    loading: !data && !error
  }
}
