// Mock comments data with infinite nesting structure
import { MOCK_USERS, getUserDisplayName } from './mockUsers';

interface Comment {
    id: string;
    user: string;
    role: string;
    avatarColor: string;
    text: string;
    likes: number;
    timeAgo: string;
    replies?: Comment[];
    userId?: number; // Kullanıcı ID'si eklendi
  }

// Yorum metinleri - her post için farklı
const commentTexts = {
  '1': [ // Post 1: Selçuk Hukuk Final Notları
    'Harika bir çalışma, emeğine sağlık! İnsan hakları bölümü özellikle çok net anlatılmış. Bu notları arkadaşlarımla da paylaşacağım.',
    'Çok teşekkür ederim! O bölümü en çok üzerinde durduğum kısımdı. Sınav haftasında da ek sorular paylaşacağım.',
    'Başarılarının devamını diliyorum, çok değerli paylaşım 🙏 Sınav sorularını da bekliyoruz!',
    'Elbette, yarın akşama kadar paylaşırım 📚',
    'Gerçekten çok faydalı oldu, özellikle anayasa değişiklikleri kısmı mükemmel!',
    'Drive linki açılmıyor galiba, tekrar kontrol edebilir misin?',
    'Düzelttim, şimdi açılıyor olması lazım. Tekrar deneyebilir misin?',
    'Sınava çalışırken bu notlar çok işime yaradı, teşekkürler!',
    'Medeni hukuk bölümü de var mı? Onu da paylaşabilir misin?',
    'Çok detaylı olmuş, emeğine sağlık! Finalde kesin işime yarayacak.'
  ],
  '2': [ // Post 2: En İyi Etli Ekmek
    'Alaaddin\'deki Hacı Usta efsanedir arkadaşlar. Fiyatlar da gayet makul.',
    'Teşekkürler! Oraya gideceğiz galiba 😊',
    'Mevlana\'nın yanındaki Tiritçi Mithat da çok güzel, ama biraz pahalı.',
    'Ben de Hacı Usta\'yı öneriyorum, hem lezzetli hem uygun fiyatlı.',
    'Kampüs yakınında da güzel yerler var, ama Alaaddin\'deki daha iyi.',
    'Etli ekmek için en iyi yer kesinlikle Hacı Usta, hiç şüpheniz olmasın!',
    'Fiyat ne kadar acaba? Öğrenci bütçesine uygun mu?',
    'Yaklaşık 25-30 TL arası, öğrenci için makul bence.'
  ],
  '3': [ // Post 3: Kiralık Ev Arkadaşı
    'Ben de ev arıyorum, hala yer var mı?',
    'Var, DM atabilirsin detaylar için.',
    'Kampüse ne kadar uzaklıkta?',
    'Yürüme mesafesi 10 dakika, çok yakın.',
    'Tramvay durağına yakın mı?',
    'Evet, 5 dakika yürüme mesafesinde.',
    'Oda nasıl? Fotoğraf paylaşabilir misiniz?',
    'Tabii, DM\'den gönderebilirim.'
  ],
  '4': [ // Post 4: Bisiklet Turu
    'Bisikletim yok ama katılabilir miyim? 😅',
    'Tabii ki! Bizden ödünç bisiklet de verebiliriz.',
    'Harika! Ben de katılmak istiyorum.',
    'Saat kaçta toplanıyoruz?',
    'Saat 10:00\'da kampüs önünden hareket ediyoruz.',
    'Kask zorunlu mu?',
    'Evet, güvenlik için kask zorunlu.'
  ],
  '5': [ // Post 5: Çalışma Grubu
    'Ben de katılmak isterim! Hangi gün ve saatte toplanıyorsunuz?',
    'Her gün saat 14:00-18:00 arası kütüphanedeyiz. Gel katıl!',
    'Fizik konusunda yardımcı olabilirim, ben de geleyim mi?',
    'Matematik için de yardım edebilirim.',
    'Harika! Yarın geliyorum.',
    'Hangi kütüphanede toplanıyoruz?',
    'Zafer Kütüphanesi, 2. kat çalışma salonu.'
  ],
  '6': [ // Post 6: Ucuz Kahvaltı
    'Selçuk Kafe çok iyi, serpme kahvaltı 85 TL. Kampüsün tam karşısında.',
    'Süper, teşekkürler! Yarın deneyeceğim.',
    'Bosna Kahvecisi de güzel, ama biraz daha pahalı.',
    'Kampüs içindeki kafeterya da uygun, ama dışarıdakiler daha lezzetli.',
    '100 TL bütçe için Selçuk Kafe ideal, hem doyurucu hem lezzetli.',
    'Sabah erken açılıyor mu?',
    'Evet, 7:00\'dan itibaren açık.'
  ],
  '7': [ // Post 7: Laptop Satılık
    'Garantisi var mı? Ve bataryası nasıl?',
    'Garanti 6 ay daha var. Batarya sağlığı %92, hiç sorun yok.',
    'Takas olur mu? Bende MacBook var.',
    'Maalesef takas yapmıyorum, sadece satış.',
    'Fiyat pazarlıklı mı?',
    'Evet, biraz pazarlık payı var.',
    'Kampüste teslim edebilir misiniz?',
    'Tabii, kampüste buluşabiliriz.'
  ],
  '8': [ // Post 8: Alaaddin Tepesi Gün Batımı
    'Harika fikir! Ben de geliyorum 🌅',
    'Süper! Görüşmek üzere 😊',
    'Fotoğraf makinesi getiriyor musunuz? Ben getireceğim.',
    'Alaaddin\'da gün batımı efsane oluyor, kaçırmayın!',
    'Çay ve simit getireceğim, başka bir şey lazım mı?',
    'Mükemmel! Hava gerçekten çok güzel bugün.',
    'Saat 6\'da orada olacağım, görüşürüz!',
    'Ben de katılıyorum, harika bir fikir!'
  ]
};

// Yorum oluşturma helper fonksiyonu
const createComment = (
  postId: string,
  commentIndex: string | number,
  userId: number,
  text: string,
  timeAgo: string,
  likes: number,
  replies?: Comment[]
): Comment => {
  const user = MOCK_USERS[userId - 1];
  return {
    id: `c${postId}-${commentIndex}`,
    user: getUserDisplayName(user),
    role: user.role,
    avatarColor: user.color,
    text,
    likes,
    timeAgo,
    replies,
    userId
  };
};

// Ana yorumlar oluşturuluyor
export const MOCK_COMMENTS: Record<string, Comment[]> = {
  '1': [
    createComment('1', 1, 2, commentTexts['1'][0], '2s', 12, [
      createComment('1', '1-r1', 1, commentTexts['1'][1], '1s', 5, [
        createComment('1', '1-r1-r1', 3, commentTexts['1'][2], '45d', 3, [
          createComment('1', '1-r1-r1-r1', 1, commentTexts['1'][3], '30d', 8)
        ])
      ]),
      createComment('1', '1-r2', 8, commentTexts['1'][4], '50d', 7)
    ]),
    createComment('1', 2, 4, commentTexts['1'][5], '5s', 8, [
      createComment('1', '2-r1', 1, commentTexts['1'][6], '3s', 2)
    ]),
    createComment('1', 3, 5, commentTexts['1'][7], '1g', 15),
    createComment('1', 4, 10, commentTexts['1'][8], '2g', 9),
    createComment('1', 5, 13, commentTexts['1'][9], '3g', 11)
  ],
  '2': [
    createComment('2', 1, 7, commentTexts['2'][0], '1s', 34, [
      createComment('2', '1-r1', 2, commentTexts['2'][1], '30d', 7)
    ]),
    createComment('2', 2, 9, commentTexts['2'][2], '3s', 18),
    createComment('2', 3, 11, commentTexts['2'][3], '5s', 22),
    createComment('2', 4, 14, commentTexts['2'][4], '10s', 15),
    createComment('2', 5, 16, commentTexts['2'][5], '1d', 28),
    createComment('2', 6, 18, commentTexts['2'][6], '2d', 12, [
      createComment('2', '6-r1', 7, commentTexts['2'][7], '1d', 8)
    ])
  ],
  '3': [
    createComment('3', 1, 6, commentTexts['3'][0], '30d', 5, [
      createComment('3', '1-r1', 11, commentTexts['3'][1], '15d', 2)
    ]),
    createComment('3', 2, 12, commentTexts['3'][2], '25d', 3, [
      createComment('3', '2-r1', 11, commentTexts['3'][3], '20d', 1)
    ]),
    createComment('3', 3, 15, commentTexts['3'][4], '20d', 4, [
      createComment('3', '3-r1', 11, commentTexts['3'][5], '18d', 2)
    ]),
    createComment('3', 4, 17, commentTexts['3'][6], '15d', 6, [
      createComment('3', '4-r1', 11, commentTexts['3'][7], '12d', 3)
    ])
  ],
  '4': [
    createComment('4', 1, 19, commentTexts['4'][0], '1g', 8, [
      createComment('4', '1-r1', 23, commentTexts['4'][1], '22s', 12)
    ]),
    createComment('4', 2, 20, commentTexts['4'][2], '2g', 15),
    createComment('4', 3, 21, commentTexts['4'][3], '1g', 9, [
      createComment('4', '3-r1', 23, commentTexts['4'][4], '20s', 5)
    ]),
    createComment('4', 4, 22, commentTexts['4'][5], '3g', 7, [
      createComment('4', '4-r1', 23, commentTexts['4'][6], '15s', 4)
    ])
  ],
  '5': [
    createComment('5', 1, 24, commentTexts['5'][0], '1s', 15, [
      createComment('5', '1-r1', 9, commentTexts['5'][1], '45d', 8)
    ]),
    createComment('5', 2, 3, commentTexts['5'][2], '2s', 22),
    createComment('5', 3, 25, commentTexts['5'][3], '3s', 18),
    createComment('5', 4, 26, commentTexts['5'][4], '5s', 12),
    createComment('5', 5, 27, commentTexts['5'][5], '1d', 9, [
      createComment('5', '5-r1', 9, commentTexts['5'][6], '20s', 6)
    ])
  ],
  '6': [
    createComment('6', 1, 28, commentTexts['6'][0], '30d', 28, [
      createComment('6', '1-r1', 8, commentTexts['6'][1], '15d', 5)
    ]),
    createComment('6', 2, 4, commentTexts['6'][2], '1s', 12),
    createComment('6', 3, 29, commentTexts['6'][3], '2s', 15),
    createComment('6', 4, 30, commentTexts['6'][4], '3s', 19),
    createComment('6', 5, 1, commentTexts['6'][5], '5s', 11, [
      createComment('6', '5-r1', 8, commentTexts['6'][6], '1s', 7)
    ])
  ],
  '7': [
    createComment('7', 1, 2, commentTexts['7'][0], '30d', 6, [
      createComment('7', '1-r1', 4, commentTexts['7'][1], '20d', 4)
    ]),
    createComment('7', 2, 7, commentTexts['7'][2], '45d', 3),
    createComment('7', 3, 5, commentTexts['7'][3], '40d', 5),
    createComment('7', 4, 8, commentTexts['7'][4], '35d', 7, [
      createComment('7', '4-r1', 4, commentTexts['7'][5], '30d', 4)
    ]),
    createComment('7', 5, 10, commentTexts['7'][6], '25d', 9, [
      createComment('7', '5-r1', 4, commentTexts['7'][7], '20d', 5)
    ])
  ],
  '8': [
    createComment('8', 1, 8, commentTexts['8'][0], '2s', 45, [
      createComment('8', '1-r1', 11, commentTexts['8'][1], '1s', 18)
    ]),
    createComment('8', 2, 9, commentTexts['8'][2], '3s', 23),
    createComment('8', 3, 1, commentTexts['8'][3], '5s', 67),
    createComment('8', 4, 12, commentTexts['8'][4], '10s', 34),
    createComment('8', 5, 13, commentTexts['8'][5], '15s', 28),
    createComment('8', 6, 14, commentTexts['8'][6], '20s', 41),
    createComment('8', 7, 15, commentTexts['8'][7], '1d', 52)
  ]
};
  
  // Helper function to convert a comment to a post format
  export const convertCommentToPost = (comment: Comment, originalPostId: string) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return {
      id: comment.id,
      title: comment.text.length > 80 ? `${comment.text.substring(0, 80)}...` : comment.text,
      user: comment.user,
      role: comment.role,
      avatarColor: comment.avatarColor,
      content: comment.text,
      likes: comment.likes,
      comments: comment.replies?.length || 0,
      fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      category: 'Yorum'
    };
  };
