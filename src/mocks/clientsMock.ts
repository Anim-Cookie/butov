export interface ClientContract {
  id: number;
  companyName: string;
  requiredChars: number;  
  maxHands: number;       
  maxDiscards: number;    
  rewardGold: number;     
  difficulty: 'Junior' | 'Middle' | 'Senior';
  description: string;
}

const mockClients: ClientContract[] = [
  {
    id: 1,
    companyName: "Yandex",
    requiredChars: 120,
    maxHands: 4,
    maxDiscards: 3,
    rewardGold: 150,
    difficulty: "Junior",
    description: "Написать вежливый отказ соискателю. Дилер раздает стабильно, лимит рук комфортный."
  },
  {
    id: 2,
    companyName: "Ozon",
    requiredChars: 350,
    maxHands: 3,
    maxDiscards: 2,
    rewardGold: 450,
    difficulty: "Middle",
    description: "Срочный оффер ведущему разработчику. Мало рук, высокий риск перебора."
  },
  {
    id: 3,
    companyName: "SberBank",
    requiredChars: 800,
    maxHands: 2,
    maxDiscards: 1,
    rewardGold: 1200,
    difficulty: "Senior",
    description: "Хантинг архитектора систем из зарубежного финтеха. Жесткие лимиты рук и сбросов."
  }
];

// Имитация сервера с задержкой 1.2 секунды
export const getClientsMock = (): Promise<ClientContract[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClients);
    }, 1200);
  });
};
