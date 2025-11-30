import React, { useState } from 'react';
import { 
  Coins, 
  Info, 
  CheckCircle2, 
  Trophy, 
  Reply, 
  ArrowRight, 
  FileText, 
  MessageCircle, 
  Eye, 
  Heart,
  TrendingUp,
  Calendar,
  Activity as ActivityIcon,
  Award,
  Users,
  Edit3,
  Clock,
  Zap,
  BookOpen
} from 'lucide-react';
import { GlobalHeader } from '../layout/GlobalHeader';
import { WalletModal } from '../wallet/WalletModal';
import { useTheme } from '../../contexts/ThemeContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MOCK_COMMENTS } from '../../data/mockComments';
import { MOCK_USERS, getUserDisplayName } from '../../data/mockUsers';
import { MiniProfileCard } from '../sidebar/MiniProfileCard';
import { TrendingVertical } from '../sidebar/TrendingVertical';
import { SuggestedGames } from '../sidebar/SuggestedGames';

// Mock Posts Data - For navigation (all posts from FeedScreen)
const MOCK_POSTS = [
  {
    id: '1',
    title: 'Selçuk Hukuk Final Notları (Anayasa)',
    category: 'akademik',
    user: 'Ahmet K.',
    role: 'Bilge',
    badge: 'Akademik',
    content: 'Anayasa hukuku finali için hazırladığım özet notlar. Drive linki aşağıda, herkese başarılar! Eksik gördüğünüz yerleri yorumlarda belirtin lütfen.',
    upvotes: 124,
    comments: 42,
    timeAgo: '2s önce',
    avatarColor: 'bg-blue-600'
  },
  {
    id: '2',
    title: 'En İyi Etli Ekmek Nerede Yenir?',
    category: 'yeme-icme',
    user: 'Ayşe Y.',
    role: 'Gezgin',
    badge: 'Yeme-İçme',
    content: 'Arkadaşlar İstanbul\'dan misafirlerim gelecek, şöyle gerçekten çıtır çıtır ve uygun fiyatlı, öğrenci dostu önerisi olan var mı?',
    upvotes: 89,
    comments: 56,
    timeAgo: '5s önce',
    avatarColor: 'bg-amber-500'
  },
  {
    id: '3',
    title: 'Bosna Hersek Mah. Kiralık Ev Arkadaşı',
    category: 'barinma',
    user: 'Mehmet T.',
    role: 'Seyyah',
    badge: 'Barınma',
    content: '3+1 evimize 3. arkadaşı arıyoruz. Kampüse yürüme mesafesinde, tramvay durağına 5 dk. Kira kişi başı 3500 TL.',
    upvotes: 12,
    comments: 5,
    timeAgo: '1g önce',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: '4',
    title: 'Haftasonu Bisiklet Turu',
    category: 'sosyal',
    user: 'Bisiklet Topluluğu',
    role: 'Yeni Gelen',
    badge: 'Sosyal',
    content: 'Bu Pazar Ecdad Parkı\'na sürüyoruz. Katılmak isteyen herkesi bekleriz. Kask zorunludur! Saat 10:00\'da kampüs önünden hareket.',
    upvotes: 45,
    comments: 18,
    timeAgo: '2g önce',
    avatarColor: 'bg-purple-600'
  },
  {
    id: '5',
    title: 'Vize Haftası Çalışma Grubu',
    category: 'akademik',
    user: 'Elif Yılmaz',
    role: 'Gezgin',
    badge: 'Akademik',
    content: 'Matematik ve Fizik dersleri için grup çalışması yapacağız. Kütüphanede toplanıyoruz. Katılmak isteyen var mı?',
    upvotes: 67,
    comments: 23,
    timeAgo: '3s önce',
    avatarColor: 'bg-blue-600'
  },
  {
    id: '6',
    title: 'Kampüs Yakını Ucuz Kahvaltı?',
    category: 'yeme-icme',
    user: 'Burak S.',
    role: 'Seyyah',
    badge: 'Yeme-İçme',
    content: 'Sabah derslerine yetişmek için erken çıkıyorum, kampüs yakınında serpme kahvaltı yapabileceğim uygun fiyatlı bir yer var mı? Budget max 100 TL.',
    upvotes: 43,
    comments: 31,
    timeAgo: '12s önce',
    avatarColor: 'bg-amber-500'
  },
  {
    id: '7',
    title: 'İkinci El Laptop Satılık',
    category: 'ikinci-el',
    user: 'Deniz K.',
    role: 'Bilge',
    badge: 'İkinci El',
    content: 'Lenovo Thinkpad E15 satıyorum. 2 yıllık, hiç sorun yok. 16GB RAM, 512 SSD. Fiyat: 15.000 TL (Pazarlık payı var). Kampüste teslim.',
    upvotes: 28,
    comments: 14,
    timeAgo: '1s önce',
    avatarColor: 'bg-pink-600'
  },
  {
    id: '8',
    title: 'Alaaddin Tepesi Gün Batımı 🌅',
    category: 'sosyal',
    user: 'Selin Aydın',
    role: 'Seyyah',
    badge: 'Sosyal',
    content: 'Akşam 6\'da Alaaddin Tepesi\'nde gün batımı izleyeceğiz. Yanında çay, simit gelsin! Hava çok güzel bugün, kaçırmayın.',
    upvotes: 92,
    comments: 47,
    timeAgo: '8s önce',
    avatarColor: 'bg-purple-600'
  }
];

// Mock Users Data - Imported from data/mockUsers.ts

// Activity Filter Types
type ActivityFilter = 'all' | 'comments' | 'likes' | 'rewards' | 'contributions' | 'social';

// Statistics Data
const STATS_DATA = {
  today: {
    coins: 120,
    activities: 8,
    interactions: 12
  }
};

// Activity Types Configuration
const ACTIVITY_TYPES = {
  comment: { icon: MessageCircle, color: '#5852c4', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  like: { icon: Heart, color: '#EF4444', bg: 'bg-red-100 dark:bg-red-900/20' },
  reward: { icon: Coins, color: '#F59E0B', bg: 'bg-amber-100 dark:bg-amber-900/20' },
  wiki_edit: { icon: FileText, color: '#10B981', bg: 'bg-emerald-100 dark:bg-emerald-900/20' },
  follow: { icon: Users, color: '#3B82F6', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  achievement: { icon: Award, color: '#8B5CF6', bg: 'bg-violet-100 dark:bg-violet-900/20' },
  post: { icon: Edit3, color: '#5852c4', bg: 'bg-purple-100 dark:bg-purple-900/20' }
};

// Comprehensive Activity Data
const ALL_ACTIVITIES = [
      { 
        id: 1, 
        type: 'reward', 
        title: 'Haftalık Seri Bonusu',
    description: 'Harika gidiyorsun! Bu hafta her gün giriş yaptığın için bonus kazandın.',
        amount: '+50 GC',
        time: '2 dk önce',
    timeFull: new Date(Date.now() - 2 * 60 * 1000),
    isRead: false,
    category: 'rewards'
      },
      { 
        id: 2, 
    type: 'comment',
        userId: 1, // Ahmet Yılmaz
        user: getUserDisplayName(MOCK_USERS[0]),
        userInitials: MOCK_USERS[0].initials,
        userColor: MOCK_USERS[0].color,
        text: 'gönderine yorum yaptı.',
        postId: '6', // Kampüs Yakını Ucuz Kahvaltı post
        commentId: 'c6-5',
    postPreview: 'Kampüs Yakını Ucuz Kahvaltı?',
        time: '15 dk önce',
    timeFull: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    canReply: true,
    category: 'comments'
  },
  {
    id: 3,
    type: 'like',
    userId: 2, // Mehmet Demir (first user)
    user: getUserDisplayName(MOCK_USERS[1]),
    userInitials: MOCK_USERS[1].initials,
    userColor: MOCK_USERS[1].color,
    users: [
      { id: 2, name: getUserDisplayName(MOCK_USERS[1]), initials: MOCK_USERS[1].initials, color: MOCK_USERS[1].color, avatar: MOCK_USERS[1].avatar },
      { id: 1, name: getUserDisplayName(MOCK_USERS[0]), initials: MOCK_USERS[0].initials, color: MOCK_USERS[0].color, avatar: MOCK_USERS[0].avatar },
      { id: 3, name: getUserDisplayName(MOCK_USERS[2]), initials: MOCK_USERS[2].initials, color: MOCK_USERS[2].color, avatar: MOCK_USERS[2].avatar },
      { id: 4, name: getUserDisplayName(MOCK_USERS[3]), initials: MOCK_USERS[3].initials, color: MOCK_USERS[3].color, avatar: MOCK_USERS[3].avatar },
      { id: 5, name: getUserDisplayName(MOCK_USERS[4]), initials: MOCK_USERS[4].initials, color: MOCK_USERS[4].color, avatar: MOCK_USERS[4].avatar }
    ],
    postId: '1', // Selçuk Hukuk Final Notları post
    otherCount: 4,
    text: 've diğerleri gönderini beğendi.',
    postTitle: 'Selçuk Hukuk Final Notları (Anayasa)',
    postContent: 'Anayasa hukuku finali için hazırladığım özet notlar. Drive linki aşağıda...',
    postImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    time: '1 saat önce',
    timeFull: new Date(Date.now() - 60 * 60 * 1000),
    isRead: false,
    category: 'likes'
  },
  {
    id: 4,
    type: 'wiki_edit',
    title: 'Selçuk Hukuk Notları başlığını düzenledin',
    description: 'Bölüm 3 - Medeni Hukuk konularını ekledin',
    status: 'Onaylandı',
    statusColor: '#10b981',
    time: '2 saat önce',
    timeFull: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
    category: 'contributions',
    wikiEntryId: 'wiki-hukuk-notlari',
    wikiTitle: 'Selçuk Hukuk Notları'
  },
  {
    id: 5,
    type: 'achievement',
    title: 'Yeni Rozet Kazandın!',
    description: 'İlk 10 Wiki düzenlemesini tamamladın',
    badgeName: 'Wiki Editörü',
    badgeIcon: '🏆',
    time: '3 saat önce',
    timeFull: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isRead: false,
    category: 'rewards'
  },
  {
    id: 6,
    type: 'comment',
        userId: 3, // Zeynep Kaya
        user: getUserDisplayName(MOCK_USERS[2]),
        userInitials: MOCK_USERS[2].initials,
        userColor: MOCK_USERS[2].color,
        postId: '5', // Vize Haftası Çalışma Grubu post
        commentId: 'c5-2',
    text: 'gönderine yorum yaptı.',
    postPreview: 'Vize Haftası Çalışma Grubu',
    time: '5 saat önce',
    timeFull: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isRead: true,
    canReply: true,
    category: 'comments'
      },
      { 
    id: 7,
        type: 'reward', 
        title: 'Etkinlik Katılımı',
    description: 'Kampüs festivaline katılımın doğrulandı.',
        amount: '+120 GC',
    time: 'Dün',
    timeFull: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    category: 'rewards'
  },
  {
    id: 8,
    type: 'follow',
    userId: 4, // Ayşe Türk
    user: getUserDisplayName(MOCK_USERS[3]),
    userInitials: MOCK_USERS[3].initials,
    userColor: MOCK_USERS[3].color,
    text: 'seni takip etmeye başladı.',
    time: 'Dün',
    timeFull: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    category: 'social'
  },
  {
    id: 9,
    type: 'like',
    userId: 5, // Can Özkan (first user)
    user: getUserDisplayName(MOCK_USERS[4]),
    userInitials: MOCK_USERS[4].initials,
    userColor: MOCK_USERS[4].color,
    users: [
      { id: 5, name: getUserDisplayName(MOCK_USERS[4]), initials: MOCK_USERS[4].initials, color: MOCK_USERS[4].color, avatar: MOCK_USERS[4].avatar },
      { id: 6, name: getUserDisplayName(MOCK_USERS[5]), initials: MOCK_USERS[5].initials, color: MOCK_USERS[5].color, avatar: MOCK_USERS[5].avatar }
    ],
    postId: '2', // En İyi Etli Ekmek post
    otherCount: 1,
    text: 've diğeri gönderini beğendi.',
    postTitle: 'En İyi Etli Ekmek Nerede Yenir?',
    postContent: 'Arkadaşlar İstanbul\'dan misafirlerim gelecek, şöyle gerçekten çıtır çıtır...',
    postImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    time: '2 gün önce',
    timeFull: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isRead: true,
    category: 'likes'
  },
  {
    id: 10,
    type: 'wiki_edit',
    title: 'KTO Karatay Üniversitesi başlığını oluşturdun',
    description: 'Yeni bir üniversite sayfası ekledin',
    status: 'Onaylandı',
    statusColor: '#10b981',
    time: '2 gün önce',
    timeFull: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: true,
    category: 'contributions',
    wikiEntryId: 'wiki-kto-karatay',
    wikiTitle: 'KTO Karatay Üniversitesi'
  },
  // 30 kullanıcıdan daha fazla bildirim ekleniyor
  {
    id: 11,
    type: 'comment',
    userId: 7, // Fatma Şahin
    user: getUserDisplayName(MOCK_USERS[6]),
    userInitials: MOCK_USERS[6].initials,
    userColor: MOCK_USERS[6].color,
    text: 'gönderine yorum yaptı.',
    postId: '2',
    commentId: 'c2-1',
    postPreview: 'En İyi Etli Ekmek Nerede Yenir?',
    time: '3 saat önce',
    timeFull: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isRead: false,
    canReply: true,
    category: 'comments'
  },
  {
    id: 12,
    type: 'like',
    userId: 8, // Burak Yıldız
    user: getUserDisplayName(MOCK_USERS[7]),
    userInitials: MOCK_USERS[7].initials,
    userColor: MOCK_USERS[7].color,
    users: [
      { id: 8, name: getUserDisplayName(MOCK_USERS[7]), initials: MOCK_USERS[7].initials, color: MOCK_USERS[7].color, avatar: MOCK_USERS[7].avatar },
      { id: 9, name: getUserDisplayName(MOCK_USERS[8]), initials: MOCK_USERS[8].initials, color: MOCK_USERS[8].color, avatar: MOCK_USERS[8].avatar },
      { id: 10, name: getUserDisplayName(MOCK_USERS[9]), initials: MOCK_USERS[9].initials, color: MOCK_USERS[9].color, avatar: MOCK_USERS[9].avatar }
    ],
    postId: '3',
    otherCount: 2,
    text: 've diğerleri gönderini beğendi.',
    postTitle: 'Bosna Hersek Mah. Kiralık Ev Arkadaşı',
    postContent: '3+1 evimize 3. arkadaşı arıyoruz...',
    time: '4 saat önce',
    timeFull: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: false,
    category: 'likes'
  },
  {
    id: 13,
    type: 'follow',
    userId: 11, // Selin Özkan
    user: getUserDisplayName(MOCK_USERS[10]),
    userInitials: MOCK_USERS[10].initials,
    userColor: MOCK_USERS[10].color,
    text: 'seni takip etmeye başladı.',
    time: '6 saat önce',
    timeFull: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: false,
    category: 'social'
  },
  {
    id: 14,
    type: 'comment',
    userId: 11, // Emre Çelik (userId 11, MOCK_USERS[10])
    user: getUserDisplayName(MOCK_USERS[10]),
    userInitials: MOCK_USERS[10].initials,
    userColor: MOCK_USERS[10].color,
    text: 'gönderine yorum yaptı.',
    postId: '2',
    commentId: 'c2-3',
    postPreview: 'En İyi Etli Ekmek Nerede Yenir?',
    time: '7 saat önce',
    timeFull: new Date(Date.now() - 7 * 60 * 60 * 1000),
    isRead: false,
    canReply: true,
    category: 'comments'
  },
  {
    id: 15,
    type: 'like',
    userId: 13, // Merve Arslan
    user: getUserDisplayName(MOCK_USERS[12]),
    userInitials: MOCK_USERS[12].initials,
    userColor: MOCK_USERS[12].color,
    users: [
      { id: 13, name: getUserDisplayName(MOCK_USERS[12]), initials: MOCK_USERS[12].initials, color: MOCK_USERS[12].color, avatar: MOCK_USERS[12].avatar },
      { id: 14, name: getUserDisplayName(MOCK_USERS[13]), initials: MOCK_USERS[13].initials, color: MOCK_USERS[13].color, avatar: MOCK_USERS[13].avatar }
    ],
    postId: '6',
    otherCount: 1,
    text: 've diğeri gönderini beğendi.',
    postTitle: 'Kampüs Yakını Ucuz Kahvaltı?',
    postContent: 'Sabah derslerine yetişmek için erken çıkıyorum...',
    time: '8 saat önce',
    timeFull: new Date(Date.now() - 8 * 60 * 60 * 1000),
    isRead: true,
    category: 'likes'
  },
  {
    id: 16,
    type: 'comment',
    userId: 15, // Ceren Yılmaz
    user: getUserDisplayName(MOCK_USERS[14]),
    userInitials: MOCK_USERS[14].initials,
    userColor: MOCK_USERS[14].color,
    text: 'gönderine yorum yaptı.',
    postId: '8',
    commentId: 'c8-7',
    postPreview: 'Alaaddin Tepesi Gün Batımı 🌅',
    time: '9 saat önce',
    timeFull: new Date(Date.now() - 9 * 60 * 60 * 1000),
    isRead: true,
    canReply: true,
    category: 'comments'
  },
  {
    id: 17,
    type: 'follow',
    userId: 16, // Onur Kılıç
    user: getUserDisplayName(MOCK_USERS[15]),
    userInitials: MOCK_USERS[15].initials,
    userColor: MOCK_USERS[15].color,
    text: 'seni takip etmeye başladı.',
    time: '10 saat önce',
    timeFull: new Date(Date.now() - 10 * 60 * 60 * 1000),
    isRead: true,
    category: 'social'
  },
  {
    id: 18,
    type: 'comment',
    userId: 17, // Gizem Aktaş
    user: getUserDisplayName(MOCK_USERS[16]),
    userInitials: MOCK_USERS[16].initials,
    userColor: MOCK_USERS[16].color,
    text: 'gönderine yorum yaptı.',
    postId: '3',
    commentId: 'c3-4',
    postPreview: 'Bosna Hersek Mah. Kiralık Ev Arkadaşı',
    time: '11 saat önce',
    timeFull: new Date(Date.now() - 11 * 60 * 60 * 1000),
    isRead: true,
    canReply: true,
    category: 'comments'
  },
  {
    id: 19,
    type: 'like',
    userId: 18, // Tolga Şen
    user: getUserDisplayName(MOCK_USERS[17]),
    userInitials: MOCK_USERS[17].initials,
    userColor: MOCK_USERS[17].color,
    users: [
      { id: 18, name: getUserDisplayName(MOCK_USERS[17]), initials: MOCK_USERS[17].initials, color: MOCK_USERS[17].color, avatar: MOCK_USERS[17].avatar },
      { id: 19, name: getUserDisplayName(MOCK_USERS[18]), initials: MOCK_USERS[18].initials, color: MOCK_USERS[18].color, avatar: MOCK_USERS[18].avatar },
      { id: 20, name: getUserDisplayName(MOCK_USERS[19]), initials: MOCK_USERS[19].initials, color: MOCK_USERS[19].color, avatar: MOCK_USERS[19].avatar },
      { id: 21, name: getUserDisplayName(MOCK_USERS[20]), initials: MOCK_USERS[20].initials, color: MOCK_USERS[20].color, avatar: MOCK_USERS[20].avatar }
    ],
    postId: '4',
    otherCount: 3,
    text: 've diğerleri gönderini beğendi.',
    postTitle: 'Haftasonu Bisiklet Turu',
    postContent: 'Bu Pazar Ecdad Parkı\'na sürüyoruz...',
    time: '12 saat önce',
    timeFull: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isRead: true,
    category: 'likes'
  },
  {
    id: 20,
    type: 'comment',
    userId: 22, // Okan Yüksel
    user: getUserDisplayName(MOCK_USERS[21]),
    userInitials: MOCK_USERS[21].initials,
    userColor: MOCK_USERS[21].color,
    text: 'gönderine yorum yaptı.',
    postId: '4',
    commentId: 'c4-4',
    postPreview: 'Haftasonu Bisiklet Turu',
    time: '13 saat önce',
    timeFull: new Date(Date.now() - 13 * 60 * 60 * 1000),
    isRead: true,
    canReply: true,
    category: 'comments'
  },
  {
    id: 21,
    type: 'follow',
    userId: 23, // Pınar Koç
    user: getUserDisplayName(MOCK_USERS[22]),
    userInitials: MOCK_USERS[22].initials,
    userColor: MOCK_USERS[22].color,
    text: 'seni takip etmeye başladı.',
    time: '14 saat önce',
    timeFull: new Date(Date.now() - 14 * 60 * 60 * 1000),
    isRead: true,
    category: 'social'
  },
  {
    id: 22,
    type: 'comment',
    userId: 24, // Hakan Aslan
    user: getUserDisplayName(MOCK_USERS[23]),
    userInitials: MOCK_USERS[23].initials,
    userColor: MOCK_USERS[23].color,
    text: 'gönderine yorum yaptı.',
    postId: '5',
    commentId: 'c5-1',
    postPreview: 'Vize Haftası Çalışma Grubu',
    time: '15 saat önce',
    timeFull: new Date(Date.now() - 15 * 60 * 60 * 1000),
    isRead: true,
    canReply: true,
    category: 'comments'
  },
  {
    id: 23,
    type: 'like',
    userId: 25, // Seda Yıldırım
    user: getUserDisplayName(MOCK_USERS[24]),
    userInitials: MOCK_USERS[24].initials,
    userColor: MOCK_USERS[24].color,
    users: [
      { id: 25, name: getUserDisplayName(MOCK_USERS[24]), initials: MOCK_USERS[24].initials, color: MOCK_USERS[24].color, avatar: MOCK_USERS[24].avatar },
      { id: 26, name: getUserDisplayName(MOCK_USERS[25]), initials: MOCK_USERS[25].initials, color: MOCK_USERS[25].color, avatar: MOCK_USERS[25].avatar }
    ],
    postId: '5',
    otherCount: 1,
    text: 've diğeri gönderini beğendi.',
    postTitle: 'Vize Haftası Çalışma Grubu',
    postContent: 'Matematik ve Fizik dersleri için grup çalışması...',
    time: '16 saat önce',
    timeFull: new Date(Date.now() - 16 * 60 * 60 * 1000),
    isRead: true,
    category: 'likes'
  },
  {
    id: 24,
    type: 'comment',
    userId: 12, // Emre Çelik (userId 12, MOCK_USERS[11])
    user: getUserDisplayName(MOCK_USERS[11]),
    userInitials: MOCK_USERS[11].initials,
    userColor: MOCK_USERS[11].color,
    text: 'gönderine yorum yaptı.',
    postId: '3',
    commentId: 'c3-2',
    postPreview: 'Bosna Hersek Mah. Kiralık Ev Arkadaşı',
    time: '17 saat önce',
    timeFull: new Date(Date.now() - 17 * 60 * 60 * 1000),
    isRead: true,
    canReply: true,
    category: 'comments'
  },
  {
    id: 25,
    type: 'follow',
    userId: 28, // Barış Öztürk
    user: getUserDisplayName(MOCK_USERS[27]),
    userInitials: MOCK_USERS[27].initials,
    userColor: MOCK_USERS[27].color,
    text: 'seni takip etmeye başladı.',
    time: '18 saat önce',
    timeFull: new Date(Date.now() - 18 * 60 * 60 * 1000),
    isRead: true,
    category: 'social'
  },
  {
    id: 26,
    type: 'comment',
    userId: 29, // Ebru Şimşek
    user: getUserDisplayName(MOCK_USERS[28]),
    userInitials: MOCK_USERS[28].initials,
    userColor: MOCK_USERS[28].color,
    text: 'yorumuna cevap verdi.',
    postId: '6',
    commentId: 'c6-3',
    postPreview: 'Kampüs Yakını Ucuz Kahvaltı?',
    time: '19 saat önce',
    timeFull: new Date(Date.now() - 19 * 60 * 60 * 1000),
    isRead: true,
    canReply: true,
    category: 'comments'
  },
  {
    id: 27,
    type: 'like',
    userId: 30, // Kemal Polat
    user: getUserDisplayName(MOCK_USERS[29]),
    userInitials: MOCK_USERS[29].initials,
    userColor: MOCK_USERS[29].color,
    users: [
      { id: 30, name: getUserDisplayName(MOCK_USERS[29]), initials: MOCK_USERS[29].initials, color: MOCK_USERS[29].color, avatar: MOCK_USERS[29].avatar }
    ],
    postId: '7',
    text: 'gönderini beğendi.',
    postTitle: 'İkinci El Laptop Satılık',
    postContent: 'Lenovo Thinkpad E15 satıyorum...',
    time: '20 saat önce',
    timeFull: new Date(Date.now() - 20 * 60 * 60 * 1000),
    isRead: true,
    category: 'likes'
  }
];

// Filter Options
const FILTER_OPTIONS: { value: ActivityFilter; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'Tümü', icon: ActivityIcon },
  { value: 'comments', label: 'Yorumlar', icon: MessageCircle },
  { value: 'likes', label: 'Beğeniler', icon: Heart },
  { value: 'rewards', label: 'Ödüller', icon: Trophy },
  { value: 'contributions', label: 'Katkılarım', icon: FileText },
  { value: 'social', label: 'Sosyal', icon: Users }
];

interface NotificationsScreenProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGameCenterClick?: () => void;
  onPostClick?: (post: any, commentId?: string) => void;
  onProfileClick?: (userId: number) => void;
  onWikiEntryClick?: (entry: any) => void;
}

export const NotificationsScreen = ({ 
  activeTab = 'notifications',
  onTabChange,
  onGameCenterClick,
  onPostClick,
  onProfileClick,
  onWikiEntryClick,
}: NotificationsScreenProps = {}) => {
  const { isDarkMode } = useTheme();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>('all');

  // Filter activities
  const filteredActivities = ALL_ACTIVITIES.filter(activity => {
    if (activeFilter === 'all') return true;
    return activity.category === activeFilter;
  });

  // Group activities by date
  const groupActivitiesByDate = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const groups: { label: string; activities: typeof ALL_ACTIVITIES }[] = [];

    const todayActivities = filteredActivities.filter(a => a.timeFull >= today);
    const yesterdayActivities = filteredActivities.filter(a => a.timeFull >= yesterday && a.timeFull < today);
    const thisWeekActivities = filteredActivities.filter(a => a.timeFull >= weekAgo && a.timeFull < yesterday);

    if (todayActivities.length > 0) {
      groups.push({ label: 'BUGÜN', activities: todayActivities });
    }
    if (yesterdayActivities.length > 0) {
      groups.push({ label: 'DÜN', activities: yesterdayActivities });
    }
    if (thisWeekActivities.length > 0) {
      groups.push({ label: 'BU HAFTA', activities: thisWeekActivities });
    }

    return groups;
  };

  const activityGroups = groupActivitiesByDate();

  // Calculate today's earned coins from reward activities
  const calculateTodayCoins = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayRewards = ALL_ACTIVITIES.filter(activity => {
      if (activity.type === 'reward' && activity.timeFull >= today) {
        return true;
      }
      return false;
    });

    let totalCoins = 0;
    todayRewards.forEach(activity => {
      if (activity.amount) {
        // Extract number from "+50 GC" format
        const match = activity.amount.match(/\d+/);
        if (match) {
          totalCoins += parseInt(match[0], 10);
        }
      }
    });

    return totalCoins;
  };

  const todayEarnedCoins = calculateTodayCoins();

  const renderActivityItem = (activity: typeof ALL_ACTIVITIES[0]) => {
    const activityType = ACTIVITY_TYPES[activity.type as keyof typeof ACTIVITY_TYPES];
    const IconComponent = activityType?.icon || Info;
    const iconColor = activityType?.color || '#8279a5';

    // REWARD TYPE
    if (activity.type === 'reward') {
      return (
        <div 
          key={activity.id}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 flex items-center gap-3 md:gap-4 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 ${activityType?.bg || ''}`}>
            <IconComponent className="w-4 h-4 md:w-5 md:h-5" style={{ color: iconColor }} strokeWidth={2.5} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
                <h4 className={`font-bold text-xs md:text-sm mb-0.5 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                  {activity.title}
                </h4>
                <p className={`text-[11px] md:text-xs line-clamp-1 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                  {activity.description}
                </p>
              </div>
              <span className="font-black text-emerald-600 text-xs md:text-sm flex-shrink-0">{activity.amount}</span>
            </div>
            <span className={`text-[10px] md:text-xs mt-0.5 block ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
              {activity.time}
            </span>
          </div>
          
          {!activity.isRead && (
            <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse" />
          )}
        </div>
      );
    }

    // ACHIEVEMENT TYPE
    if (activity.type === 'achievement') {
      return (
        <div 
          key={activity.id}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 flex items-center gap-3 md:gap-4 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 ${activityType?.bg || ''} text-xl md:text-2xl`}>
            {activity.badgeIcon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`font-bold text-xs md:text-sm mb-0.5 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
              {activity.title}
            </h4>
            <p className={`text-[11px] md:text-xs line-clamp-1 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
              {activity.description}
            </p>
            {activity.badgeName && (
              <span className={`hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${
                isDarkMode ? 'bg-violet-900/30 text-violet-300' : 'bg-violet-100 text-violet-700'
              }`}>
                <Award className="w-3 h-3" />
                {activity.badgeName}
              </span>
            )}
            <span className={`text-[10px] md:text-xs block mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
              {activity.time}
            </span>
          </div>

          {!activity.isRead && (
            <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse" />
          )}
        </div>
      );
    }

    // LIKE TYPE with multiple users (special layout)
    if (activity.type === 'like' && activity.users && activity.users.length > 0) {
      const firstUser = activity.users[0];
      const otherUsers = activity.users.slice(1, 6); // Show max 5 more avatars
      const totalCount = (activity.otherCount || 0) + activity.users.length;
      
      const handleClick = () => {
        if (activity.postId && onPostClick) {
          const post = MOCK_POSTS.find(p => p.id === activity.postId);
          if (post) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const postWithFullDate = {
              ...post,
              fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
              likes: post.upvotes,
              comments: post.comments,
            };
            onPostClick(postWithFullDate);
          }
        }
      };

      return (
        <div 
          key={activity.id}
          onClick={handleClick}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className="flex items-start gap-3 md:gap-4">
            {/* Left: User Avatars with Heart Badge */}
            <div className="relative flex-shrink-0">
              {/* Overlapping User Avatars */}
              <div className="relative flex items-center">
                {activity.users.slice(0, 5).map((user, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-full ${idx === 0 ? '' : '-ml-2'} ${
                      isDarkMode ? 'ring-2 ring-[#1a1a2e]' : 'ring-2 ring-white'
                    }`}
                    style={{ zIndex: 10 - idx }}
                  >
                    {user.avatar ? (
                      <ImageWithFallback
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover"
                        fallbackSrc=""
                      />
                    ) : (
                      <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${user.color} flex items-center justify-center text-white text-[10px] md:text-xs font-bold`}>
                        {user.initials}
                      </div>
                    )}
                    {/* Heart Badge on first avatar */}
                    {idx === 0 && (
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 ${
                        isDarkMode ? 'border-[#1a1a2e]' : 'border-white'
                      } ${activityType?.bg || ''} flex items-center justify-center`}>
                        <Heart className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#EF4444] fill-[#EF4444]" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Vertical Line - connects to post card */}
              {(activity.postTitle || activity.postContent) && (
                <div className={`absolute left-[22px] md:left-[28px] top-[44px] md:top-[52px] w-0.5 ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-300'}`} style={{ height: '60px' }} />
              )}
            </div>
            
            {/* Right: Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
                  <p className={`text-xs md:text-sm leading-snug mb-0.5 ${isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'}`}>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                      {firstUser.name}
                    </span> {activity.text || 've diğerleri gönderini beğendi.'}
                  </p>
                  <span className={`text-[10px] md:text-xs block ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
                    {activity.time}
                  </span>
                </div>
                {!activity.isRead && (
                  <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse mt-1" />
                )}
              </div>
              
              {/* Post Preview Card */}
              {(activity.postTitle || activity.postContent) && (
                <div className={`mt-3 rounded-lg overflow-hidden border ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex gap-3 p-3">
                    <div className="flex-1 min-w-0">
                      {activity.postTitle && (
                        <h4 className={`text-xs md:text-sm font-bold mb-1 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                          {activity.postTitle}
                        </h4>
                      )}
                      {activity.postContent && (
                        <p className={`text-[11px] md:text-xs line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                          {activity.postContent}
                        </p>
                      )}
                    </div>
                    {activity.postImage && (
                      <div className="flex-shrink-0">
                        <ImageWithFallback
                          src={activity.postImage}
                          alt={activity.postTitle || 'Post'}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                          fallbackSrc=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // SOCIAL INTERACTIONS (comments, follows, single like)
    if (['comment', 'follow'].includes(activity.type) || (activity.type === 'like' && !activity.users)) {
      const handleClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on button
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }
        
        if (activity.type === 'comment' && activity.postId && onPostClick) {
          // Navigate to post
          const post = MOCK_POSTS.find(p => p.id === activity.postId);
          if (post) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const postWithFullDate = {
              ...post,
              fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
              likes: post.upvotes,
              comments: post.comments,
            };
            onPostClick(postWithFullDate, activity.commentId);
          }
        } else if (activity.type === 'follow' && activity.userId && onProfileClick) {
          // Navigate to profile
          onProfileClick(activity.userId);
        }
      };

      const handleReplyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (!onPostClick || !activity.postId) {
          return;
        }
        
        const post = MOCK_POSTS.find(p => p.id === activity.postId);
        if (!post) {
          return;
        }
        
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const postWithFullDate = {
          ...post,
          fullDate: `${hours}:${minutes} • ${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
          likes: post.upvotes,
          comments: post.comments,
        };
        
        // Navigate to post with comment highlighted
        onPostClick(postWithFullDate, activity.commentId);
      };

      return (
        <div 
          key={activity.id}
          onClick={handleClick}
          className={`w-full p-3 md:p-4 border-b last:border-b-0 transition-all cursor-pointer ${
            isDarkMode 
              ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
              : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
          } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
        >
          <div className="flex items-start gap-3 md:gap-4">
            <div className="relative flex-shrink-0">
              {(() => {
                const user = activity.userId ? MOCK_USERS.find(u => u.id === activity.userId) : null;
                const userAvatar = user?.avatar;
                
                return userAvatar ? (
                  <ImageWithFallback
                    src={userAvatar}
                    alt={activity.user}
                    className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover"
                    fallbackSrc=""
                  />
                ) : (
                  <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full ${activity.userColor} flex items-center justify-center text-white text-[10px] md:text-xs font-bold`}>
                    {activity.userInitials}
                  </div>
                );
              })()}
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 ${
                isDarkMode ? 'border-[#1a1a2e]' : 'border-white'
              } ${activityType?.bg || ''} flex items-center justify-center`}>
                <IconComponent className="w-2 h-2 md:w-2.5 md:h-2.5" style={{ color: iconColor }} strokeWidth={3} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-xs md:text-sm leading-snug mb-0.5 ${isDarkMode ? 'text-slate-300' : 'text-[#8279a5]'}`}>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
                  {activity.user}
                </span> {activity.text}
              </p>
              {activity.postPreview && (
                <p className={`hidden md:block text-xs mt-1 line-clamp-1 italic ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
                  "{activity.postPreview}"
                </p>
              )}
              <div className="flex items-center justify-between mt-1">
                <span className={`text-[10px] md:text-xs ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`}>
                  {activity.time}
                </span>
                {!activity.isRead && (
                  <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse md:hidden" />
                )}
              </div>
            </div>

            {!activity.isRead && (
              <div className="hidden md:block w-2 h-2 rounded-full bg-[#5852c4] mt-1 flex-shrink-0 animate-pulse" />
            )}
          </div>

          {activity.type === 'comment' && onPostClick && activity.postId && (
            <div 
              className="ml-[42px] md:ml-[60px] mt-2 md:mt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                type="button"
                onClick={handleReplyClick}
                className={`flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[11px] md:text-xs font-bold transition-colors cursor-pointer ${
                isDarkMode 
                    ? 'bg-[#5852c4] text-white hover:bg-[#6d65d9] shadow-lg shadow-[#5852c4]/20' 
                    : 'bg-[#5852c4] text-white hover:bg-[#6d65d9] shadow-lg shadow-[#5852c4]/20'
                }`}
              >
                <Reply className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>Yanıtla</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    // WIKI EDIT / POST TYPE
    const handleWikiClick = () => {
      if (activity.type === 'wiki_edit' && onWikiEntryClick && activity.title) {
        // Create wiki entry structure based on activity data
        const wikiTitle = (activity as any).wikiTitle || (activity.title.includes('başlığını') 
          ? activity.title.split(' başlığını')[0] 
          : activity.title);
        
        const wikiEntry = {
          id: (activity as any).wikiEntryId || 'wiki-1',
          title: wikiTitle,
          category: 'Akademik Destek' as const,
          categoryId: 'akademik-destek',
          data: {
            type: 'academic' as const,
            fields: [
              { icon: FileText, label: 'Ders', value: wikiTitle, editable: true, key: 'course' },
              { icon: BookOpen, label: 'Açıklama', value: activity.description || '', editable: true, key: 'description' }
            ]
          },
          lastEditedBy: 'Fatih Y.',
          lastEditedAt: activity.time,
          version: 1,
          upvotes: 0,
          downvotes: 0,
          isOwnEntry: true
        };
        onWikiEntryClick(wikiEntry);
      }
    };

    return (
      <div 
        key={activity.id}
        onClick={handleWikiClick}
        className={`w-full p-3 md:p-4 border-b last:border-b-0 flex items-center gap-3 md:gap-4 transition-all cursor-pointer ${
          isDarkMode 
            ? 'bg-[#1a1a2e] border-slate-700/50 hover:bg-slate-800/50' 
            : 'bg-white border-[#ededff] hover:bg-[#f2f3f7]'
        } ${!activity.isRead ? (isDarkMode ? 'bg-slate-800/30' : 'bg-purple-50/50') : ''}`}
      >
        <div className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center flex-shrink-0 ${activityType?.bg || ''}`}>
          <IconComponent className="w-4 h-4 md:w-5 md:h-5" style={{ color: iconColor }} strokeWidth={2.5} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-xs md:text-sm mb-0.5 line-clamp-1 ${isDarkMode ? 'text-white' : 'text-[#19142e]'}`}>
            {activity.title}
          </h4>
          {activity.description && (
            <p className={`hidden md:block text-xs line-clamp-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
              {activity.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-[10px] md:text-xs mt-0.5">
            <span className={isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}>
              {activity.time}
            </span>
            {activity.status && (
              <>
                <span className={`hidden md:inline ${isDarkMode ? 'text-slate-600' : 'text-[#8279a5]'}`}>•</span>
                <span 
                  className="hidden md:inline font-bold"
                  style={{ color: activity.statusColor }}
                >
                  {activity.status}
                </span>
              </>
            )}
        </div>
        </div>

        {!activity.isRead && (
          <div className="w-2 h-2 rounded-full bg-[#5852c4] flex-shrink-0 animate-pulse" />
        )}
      </div>
    );
  };

  // Get filter counts
  const getFilterCount = (filter: ActivityFilter) => {
    if (filter === 'all') return ALL_ACTIVITIES.length;
    return ALL_ACTIVITIES.filter(a => a.category === filter).length;
  };

  const unreadCount = ALL_ACTIVITIES.filter(a => !a.isRead).length;

  return (
    <>
      <div className={`min-h-screen pb-32 lg:pb-6 transition-colors ${
        isDarkMode ? 'bg-[#0f0e17]' : 'bg-[#f2f3f7]'
      }`}>
        
        {/* Global Header */}
        <GlobalHeader 
          type="rich"
          onWalletClick={() => setIsWalletModalOpen(true)}
          coinBalance="2.450"
          onSearchClick={() => console.log('🔍 Search clicked')}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onGameCenterClick={onGameCenterClick}
        />

        {/* Main Content */}
        <div className="pt-[120px] lg:pt-[84px]">
          <div className="max-w-[1200px] mx-auto px-0 lg:px-6">
            <div className="flex gap-6">
              
              {/* LEFT COLUMN - Main Content */}
              <main className="w-full lg:w-[70%]">
                {/* 1. PAGE HEADER */}
                <header className="px-5 lg:px-0 py-4 md:py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h1 className={`text-xl md:text-2xl font-black transition-colors ${
                isDarkMode ? 'text-white' : 'text-[#19142e]'
                    }`}>
                        Aktivite Merkezi
                      </h1>
                      {unreadCount > 0 && (
                        <p className={`text-xs md:text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'}`}>
                          {unreadCount} yeni aktivite
                        </p>
                      )}
                    </div>
              <button 
                      className={`p-1.5 md:p-2 rounded-lg transition-colors group ${
                  isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-white'
                }`}
                aria-label="Mark all as read"
                      title="Tümünü okundu işaretle"
              >
                      <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                  isDarkMode ? 'text-slate-400 group-hover:text-[#5852c4]' : 'text-[#8279a5] group-hover:text-[#5852c4]'
                }`} strokeWidth={2.5} />
              </button>
                  </div>
            </header>

                {/* 2. FILTER TABS */}
                <div className="px-5 lg:px-0 mb-4 md:mb-6">
                  <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {FILTER_OPTIONS.map((filter) => {
                      const FilterIcon = filter.icon;
                      const count = getFilterCount(filter.value);
                      const isActive = activeFilter === filter.value;
                      
                  return (
                        <button
                          key={filter.value}
                          onClick={() => setActiveFilter(filter.value)}
                          className={`flex items-center gap-1 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                            isActive
                              ? isDarkMode
                                ? 'bg-[#5852c4] text-white shadow-lg shadow-[#5852c4]/20'
                                : 'bg-[#5852c4] text-white shadow-lg shadow-[#5852c4]/20'
                              : isDarkMode
                                ? 'bg-[#1a1a2e] text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                                : 'bg-white text-[#8279a5] hover:bg-[#f2f3f7] hover:text-[#19142e] border border-[#ededff]'
                          }`}
                        >
                          <FilterIcon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
                          <span>{filter.label}</span>
                          {count > 0 && (
                            <span className={`px-1 md:px-1.5 py-0.5 rounded-full text-[10px] md:text-xs ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : isDarkMode
                                  ? 'bg-slate-700 text-slate-300'
                                  : 'bg-[#f2f3f7] text-[#8279a5]'
                            }`}>
                              {count}
                            </span>
                          )}
                        </button>
                  );
                })}
              </div>
            </div>

                {/* 3. ACTIVITY TIMELINE */}
                <div className="px-5 lg:px-0 space-y-4 md:space-y-6">
                  {activityGroups.length > 0 ? (
                    activityGroups.map((group) => (
                <div key={group.label}>
                  {/* Group Label */}
                        <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${
                      isDarkMode ? 'bg-slate-500' : 'bg-[#8279a5]'
                    }`} />
                          <h3 className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                    }`}>
                      {group.label}
                    </h3>
                  </div>
                  
                  {/* Group Items */}
                        <div className={`rounded-lg md:rounded-xl shadow-sm overflow-hidden border ${
                    isDarkMode 
                      ? 'bg-[#1a1a2e] border-slate-700/50' 
                      : 'bg-white border-[#ededff]'
                  }`}>
                          {group.activities.map((activity) => renderActivityItem(activity))}
                  </div>
                </div>
                    ))
                  ) : (
                    <div className={`rounded-lg md:rounded-xl shadow-sm border p-8 md:p-12 text-center ${
                      isDarkMode 
                        ? 'bg-[#1a1a2e] border-slate-700/50' 
                        : 'bg-white border-[#ededff]'
                    }`}>
                      <ActivityIcon className={`w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 ${
                        isDarkMode ? 'text-slate-600' : 'text-[#8279a5]'
                      }`} />
                      <p className={`text-xs md:text-sm font-bold mb-1 ${
                        isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                      }`}>
                        Bu kategoride aktivite bulunamadı
                      </p>
                      <p className={`text-[10px] md:text-xs ${
                        isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'
                      }`}>
                        Başka bir filtre seçmeyi deneyin
                      </p>
                    </div>
                  )}
            </div>

            {/* Footer */}
                <div className="px-5 lg:px-0 mt-6 md:mt-8 text-center">
              <button className={`inline-flex items-center gap-2 text-xs font-bold transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-[#5852c4]' 
                  : 'text-[#8279a5] hover:text-[#5852c4]'
              }`}>
                Tüm geçmişi görüntüle
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
              </main>

              {/* RIGHT COLUMN - Sidebar with Daily Summary (Desktop Only) */}
              <aside className="hidden lg:block w-[30%]">
                <div className="sticky top-[84px] space-y-6">
                  {/* Daily Summary Card - Above Profile */}
                  <div className={`rounded-[10px] transition-all ${
                    isDarkMode ? 'bg-transparent' : 'bg-transparent'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <p className={`text-xs font-bold uppercase tracking-wider ${
                        isDarkMode ? 'text-slate-400' : 'text-[#8279a5]'
                      }`}>BUGÜN</p>
                      <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-[#8279a5]'}`} strokeWidth={2} />
                    </div>
                    
                    {/* GençCoin - Only today's earned coins */}
                    {todayEarnedCoins > 0 && (
                      <div className={`rounded-[10px] p-4 ${
                      isDarkMode 
                          ? 'bg-gradient-to-r from-[#5852c4] via-[#4F46E5] to-[#3B82F6]' 
                          : 'bg-gradient-to-r from-[#5852c4] via-[#4F46E5] to-[#3B82F6]'
                    }`}>
                      <div className="flex items-baseline gap-2 mb-1.5">
                          <span className="text-2xl font-black text-white">+{todayEarnedCoins}</span>
                        <span className="text-sm font-bold text-white/90">GC</span>
                      </div>
                      <p className="text-white/80 text-xs">GençCoin</p>
                    </div>
                    )}
                  </div>
                  
                  {/* Right Sidebar Components - Manual Implementation */}
                  <MiniProfileCard 
                    onProfileClick={() => onTabChange?.('profile')}
                    coins={6240}
                  />
                  <TrendingVertical />
                  <SuggestedGames 
                    onGameClick={(gameId) => {
                      if (gameId === 'all') {
                        onGameCenterClick?.();
                      }
                    }} 
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};
