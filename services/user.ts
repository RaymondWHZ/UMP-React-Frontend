import {useToast} from "@chakra-ui/react";
import useSWR from "swr";
import request from "@/utils/request";

export interface UserInfo {
  email?: string
  name?: string
  picture?: string
  freeTrial?: boolean
  expired?: boolean
  endDate?: boolean
}

export function useUserInfo(): {
  data: UserInfo
  error: any
  loading: boolean
} {
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
      return {};
    }
  })
  return {
    data: {
      ...data,
      freeTrial: data && data["Free Trial"] == "True",
      expired: data && data["Expired"] == "True",
      endDate: data && data["End Date"]
    },
    error,
    loading: !data && !error
  }
}
