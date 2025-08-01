import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card"
import { useGetUsersMonthBirthDues } from '@/api/dues';
import { useGetUsers } from '@/api/user';
import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

export default function UserBirthDues() {
  const { data: usersBirthDues, isLoading: usersBirthDuesLoading} = useGetUsersMonthBirthDues({year: dayjs().format('YYYY')});
  const { data: users, isLoading: usersLoading} = useGetUsers();

  if(usersBirthDuesLoading || usersLoading) {
    return <div>loading</div>
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>월별 생일비 입금 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-13 gap-x-2 gap-y-2 text-center text-sm items-center">
            <div className="font-semibold"></div>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <div key={month} className="font-semibold">{month}월</div>
            ))}
            {users?.map((user) => {
              const duesData = usersBirthDues?.find(d => d.dues_user_name === user.user_name);
              const dues = duesData ? duesData.month_birth_dues : Array(12).fill(0);

              return (
                <>
                  <div className="font-semibold text-left py-1">{user.user_name}</div>
                  {dues.map((value, index) => (
                    <div key={index} className="flex justify-center items-center">
                      <div className={cn(
                        "relative w-12 h-10 flex items-center justify-center rounded-md text-base",
                        value > 0 ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'bg-muted dark:bg-muted'
                      )}>
                        {user.user_birth && parseInt(user.user_birth.substring(4, 6)) === index + 1 && <Gift className="absolute top-1 left-1 h-3.5 w-3.5" />}
                        {value > 0 && (
                          <span className="font-semibold">
                            {(value / 10000).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}