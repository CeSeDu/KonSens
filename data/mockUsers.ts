// 40 kullanıcı mock data

export interface MockUser {
  id: number;
  name: string;
  initials: string;
  username: string;
  color: string;
  avatar: string | null;
  school: string;
  department: string;
  role: string; // Gezgin, Bilge, Seyyah, Yeni Gelen
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    initials: 'AY',
    username: '@ahmetyilmaz',
    color: 'bg-blue-600',
    avatar: 'https://i.pravatar.cc/150?img=1',
    school: 'Selçuk Üniversitesi',
    department: 'Hukuk',
    role: 'Bilge'
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    initials: 'MD',
    username: '@mehmetdemir',
    color: 'bg-emerald-600',
    avatar: 'https://i.pravatar.cc/150?img=12',
    school: 'KTO Karatay',
    department: 'İşletme',
    role: 'Gezgin'
  },
  {
    id: 3,
    name: 'Zeynep Kaya',
    initials: 'ZK',
    username: '@zeynepkaya',
    color: 'bg-purple-600',
    avatar: 'https://i.pravatar.cc/150?img=47',
    school: 'Selçuk Üniversitesi',
    department: 'Edebiyat',
    role: 'Seyyah'
  },
  {
    id: 4,
    name: 'Ayşe Türk',
    initials: 'AT',
    username: '@ayseturk',
    color: 'bg-pink-600',
    avatar: 'https://i.pravatar.cc/150?img=5',
    school: 'NEÜ',
    department: 'Tıp',
    role: 'Bilge'
  },
  {
    id: 5,
    name: 'Can Özkan',
    initials: 'CÖ',
    username: '@canozkan',
    color: 'bg-indigo-600',
    avatar: 'https://i.pravatar.cc/150?img=13',
    school: 'NEÜ',
    department: 'Hukuk',
    role: 'Gezgin'
  },
  {
    id: 6,
    name: 'Ali Veli',
    initials: 'AV',
    username: '@aliveli',
    color: 'bg-teal-600',
    avatar: 'https://i.pravatar.cc/150?img=15',
    school: 'Selçuk Üniversitesi',
    department: 'Mühendislik',
    role: 'Seyyah'
  },
  {
    id: 7,
    name: 'Fatma Şahin',
    initials: 'FŞ',
    username: '@fatmasahin',
    color: 'bg-rose-600',
    avatar: 'https://i.pravatar.cc/150?img=9',
    school: 'KTO Karatay',
    department: 'Mimarlık',
    role: 'Bilge'
  },
  {
    id: 8,
    name: 'Burak Yıldız',
    initials: 'BY',
    username: '@burakyildiz',
    color: 'bg-amber-600',
    avatar: 'https://i.pravatar.cc/150?img=33',
    school: 'Selçuk Üniversitesi',
    department: 'Bilgisayar',
    role: 'Gezgin'
  },
  {
    id: 9,
    name: 'Elif Aydın',
    initials: 'EA',
    username: '@elifaydin',
    color: 'bg-violet-600',
    avatar: 'https://i.pravatar.cc/150?img=20',
    school: 'NEÜ',
    department: 'Psikoloji',
    role: 'Seyyah'
  },
  {
    id: 10,
    name: 'Deniz Kaya',
    initials: 'DK',
    username: '@denizkaya',
    color: 'bg-cyan-600',
    avatar: 'https://i.pravatar.cc/150?img=51',
    school: 'Selçuk Üniversitesi',
    department: 'İktisat',
    role: 'Bilge'
  },
  {
    id: 11,
    name: 'Selin Özkan',
    initials: 'SÖ',
    username: '@selinozkan',
    color: 'bg-fuchsia-600',
    avatar: 'https://i.pravatar.cc/150?img=27',
    school: 'KTO Karatay',
    department: 'Güzel Sanatlar',
    role: 'Gezgin'
  },
  {
    id: 12,
    name: 'Emre Çelik',
    initials: 'EÇ',
    username: '@emrecelik',
    color: 'bg-sky-600',
    avatar: 'https://i.pravatar.cc/150?img=32',
    school: 'Selçuk Üniversitesi',
    department: 'Makine',
    role: 'Seyyah'
  },
  {
    id: 13,
    name: 'Merve Arslan',
    initials: 'MA',
    username: '@mervearslan',
    color: 'bg-emerald-500',
    avatar: 'https://i.pravatar.cc/150?img=45',
    school: 'NEÜ',
    department: 'Eczacılık',
    role: 'Bilge'
  },
  {
    id: 14,
    name: 'Kerem Doğan',
    initials: 'KD',
    username: '@keremdogan',
    color: 'bg-orange-600',
    avatar: 'https://i.pravatar.cc/150?img=11',
    school: 'Selçuk Üniversitesi',
    department: 'Elektrik',
    role: 'Gezgin'
  },
  {
    id: 15,
    name: 'Ceren Yılmaz',
    initials: 'CY',
    username: '@cerenyilmaz',
    color: 'bg-lime-600',
    avatar: 'https://i.pravatar.cc/150?img=16',
    school: 'KTO Karatay',
    department: 'İletişim',
    role: 'Seyyah'
  },
  {
    id: 16,
    name: 'Onur Kılıç',
    initials: 'OK',
    username: '@onurkilic',
    color: 'bg-red-600',
    avatar: 'https://i.pravatar.cc/150?img=18',
    school: 'Selçuk Üniversitesi',
    department: 'Endüstri',
    role: 'Bilge'
  },
  {
    id: 17,
    name: 'Gizem Aktaş',
    initials: 'GA',
    username: '@gizemaktas',
    color: 'bg-pink-500',
    avatar: 'https://i.pravatar.cc/150?img=24',
    school: 'NEÜ',
    department: 'Hemşirelik',
    role: 'Gezgin'
  },
  {
    id: 18,
    name: 'Tolga Şen',
    initials: 'TŞ',
    username: '@tolgasen',
    color: 'bg-blue-500',
    avatar: 'https://i.pravatar.cc/150?img=29',
    school: 'Selçuk Üniversitesi',
    department: 'İnşaat',
    role: 'Seyyah'
  },
  {
    id: 19,
    name: 'Derya Özdemir',
    initials: 'DÖ',
    username: '@deryaozdemir',
    color: 'bg-purple-500',
    avatar: 'https://i.pravatar.cc/150?img=36',
    school: 'KTO Karatay',
    department: 'Hukuk',
    role: 'Bilge'
  },
  {
    id: 20,
    name: 'Serkan Aydın',
    initials: 'SA',
    username: '@serkanaydin',
    color: 'bg-green-600',
    avatar: 'https://i.pravatar.cc/150?img=40',
    school: 'Selçuk Üniversitesi',
    department: 'Ziraat',
    role: 'Gezgin'
  },
  {
    id: 21,
    name: 'Burcu Çetin',
    initials: 'BÇ',
    username: '@burcucetin',
    color: 'bg-yellow-600',
    avatar: 'https://i.pravatar.cc/150?img=42',
    school: 'NEÜ',
    department: 'Eğitim',
    role: 'Seyyah'
  },
  {
    id: 22,
    name: 'Okan Yüksel',
    initials: 'OY',
    username: '@okanyuksel',
    color: 'bg-indigo-500',
    avatar: 'https://i.pravatar.cc/150?img=44',
    school: 'Selçuk Üniversitesi',
    department: 'Fen',
    role: 'Bilge'
  },
  {
    id: 23,
    name: 'Pınar Koç',
    initials: 'PK',
    username: '@pinarkoc',
    color: 'bg-teal-500',
    avatar: 'https://i.pravatar.cc/150?img=46',
    school: 'KTO Karatay',
    department: 'Turizm',
    role: 'Gezgin'
  },
  {
    id: 24,
    name: 'Hakan Aslan',
    initials: 'HA',
    username: '@hakanaslan',
    color: 'bg-rose-500',
    avatar: 'https://i.pravatar.cc/150?img=48',
    school: 'Selçuk Üniversitesi',
    department: 'Spor',
    role: 'Seyyah'
  },
  {
    id: 25,
    name: 'Seda Yıldırım',
    initials: 'SY',
    username: '@sedayildirim',
    color: 'bg-amber-500',
    avatar: 'https://i.pravatar.cc/150?img=50',
    school: 'NEÜ',
    department: 'Sağlık',
    role: 'Bilge'
  },
  {
    id: 26,
    name: 'Murat Güneş',
    initials: 'MG',
    username: '@muratgunes',
    color: 'bg-violet-500',
    avatar: 'https://i.pravatar.cc/150?img=52',
    school: 'Selçuk Üniversitesi',
    department: 'Edebiyat',
    role: 'Gezgin'
  },
  {
    id: 27,
    name: 'Aslı Karaca',
    initials: 'AK',
    username: '@aslikaraca',
    color: 'bg-cyan-500',
    avatar: 'https://i.pravatar.cc/150?img=54',
    school: 'KTO Karatay',
    department: 'Tarih',
    role: 'Seyyah'
  },
  {
    id: 28,
    name: 'Barış Öztürk',
    initials: 'BÖ',
    username: '@barisozturk',
    color: 'bg-fuchsia-500',
    avatar: 'https://i.pravatar.cc/150?img=56',
    school: 'Selçuk Üniversitesi',
    department: 'Coğrafya',
    role: 'Bilge'
  },
  {
    id: 29,
    name: 'Ebru Şimşek',
    initials: 'EŞ',
    username: '@ebrusimsek',
    color: 'bg-sky-500',
    avatar: 'https://i.pravatar.cc/150?img=58',
    school: 'NEÜ',
    department: 'Biyoloji',
    role: 'Gezgin'
  },
  {
    id: 30,
    name: 'Kemal Polat',
    initials: 'KP',
    username: '@kemalpolat',
    color: 'bg-emerald-400',
    avatar: 'https://i.pravatar.cc/150?img=60',
    school: 'Selçuk Üniversitesi',
    department: 'Kimya',
    role: 'Seyyah'
  },
];

// Helper function to get user by ID
export const getUserById = (id: number): MockUser | undefined => {
  return MOCK_USERS.find(user => user.id === id);
};

// Helper function to get user display name (first name + last initial)
export const getUserDisplayName = (user: MockUser): string => {
  const parts = user.name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1].charAt(0)}.`;
  }
  return user.name;
};

