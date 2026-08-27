import bannerArthouse from './assets/banner/banner arthouse.jfif';
import bannerMaison from './assets/banner/banner maison.png';
import bannerWaebo from './assets/banner/banner waebo.jfif';
import bannerDeskify from './assets/banner/banner deskify.jfif';

const dataDiri = {
  nama: "Muhamad Elgar",
  about: "Fresh graduate Ilmu Komputer Universitas Djuanda Bogor (IPK 3,91) dengan pengalaman membangun antarmuka web menggunakan HTML, CSS, Tailwind CSS, dan Laravel (Blade), mulai dari riset kebutuhan, perancangan UI/UX, hingga implementasi. Terbiasa membuat tampilan yang rapi, terstruktur, dan responsif, serta pernah berkolaborasi langsung dengan mitra industri dalam pengembangan sistem informasi berbasis web.",
  foto_profile: "assets/profile.png",
  resume: "/resume-en.pdf",
  resume_id: "/resume-id.pdf",
  contact: {
    email: "elgarsmi12@gmail.com",
    linkedin: "https://www.linkedin.com/in/muhamad-elgar-74b73532a/",
    website: "https://muhamadelgar.vercel.app",
    github: "https://github.com",
    instagram: "https://www.instagram.com/e.garr_?igsi=dHpub21ianB5b3g=",
    youtube1: "https://www.youtube.com/@ItsNekitsz",
  },
  services: [
    {
      id: 1,
      title: "Frontend Web Development",
      desc: "Membangun antarmuka web yang rapi, terstruktur, dan responsif menggunakan HTML, CSS, Tailwind CSS, dan Laravel (Blade).",
    },
    {
      id: 2,
      title: "UI/UX Design",
      desc: "Merancang antarmuka pengguna yang intuitif, alur navigasi yang konsisten, dan prototipe sistem berbasis web maupun mobile.",
    },
    {
      id: 3,
      title: "Mobile Development (Flutter)",
      desc: "Merancang dan mengembangkan tampilan aplikasi mobile dengan fokus pada kemudahan penggunaan.",
    },
    {
      id: 4,
      title: "Data Entry & Administration",
      desc: "Mencatat transaksi harian, menjaga akurasi data keuangan, serta pengarsipan dokumen pendukung.",
    },
  ],
  projects: [
    {
      id: 1,
      title: "Art House",
      time: "Okt 2025 - Mei 2026",
      role: "Full Stack Developer & UI/UX Designer",
      image: bannerArthouse,
      desc: "Proyek Tugas Akhir kolaborasi dengan CV. Sindikasi Artistik Indonesia (Sindikart). Merancang dan mengembangkan antarmuka sistem informasi manajemen kru dan proyek perfilman berbasis web untuk menyederhanakan pelacakan proyek dan alokasi kru.",
      tech: ["HTML", "CSS", "Tailwind CSS", "Laravel (Blade)", "MySQL", "Figma"],
      link: "#",
    },
    {
      id: 2,
      title: "BM Mart & Pakan Pintar",
      time: "Agu - Des 2025",
      role: "UI/UX Designer & Mobile Developer (Flutter)",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      desc: "Proyek Kuliah dan Program KKN. Merancang tampilan antarmuka dan alur navigasi aplikasi mobile untuk fitur katalog produk, poin pelanggan, dan penjadwalan pakan ternak.",
      tech: ["Flutter", "Figma", "UI/UX Design"],
      link: "#",
    },
    {
      id: 3,
      title: "Maison Neko Cafe",
      time: "31 Des 2025",
      role: "Frontend Developer",
      image: bannerMaison,
      desc: "Proyek dummy mandiri untuk mencoba eksplorasi pengembangan antarmuka web dari HTML dan Bootstrap dengan menggunakan Tailwind CSS.",
      tech: ["HTML", "Bootstrap", "Tailwind CSS"],
      link: "https://maison-neko-cafe.vercel.app/",
    },
    {
      id: 4,
      title: "Weabo Associations",
      time: "Recent Project",
      role: "Front End Developer",
      image: bannerWaebo,
      desc: "Proyek dummy mandiri yang dibuat menggunakan React dan Tailwind CSS.",
      tech: ["React", "Tailwind CSS"],
      link: "https://weabo-association.vercel.app/",
    },
    {
      id: 5,
      title: "Deskify",
      time: "Recent Project",
      role: "Front End Developer",
      image: bannerDeskify,
      desc: "Proyek dummy mandiri yang dibuat menggunakan React dan Tailwind CSS.",
      tech: ["React", "Tailwind CSS"],
      link: "https://deskify-psi.vercel.app/",
    }
  ],
  education: [
    {
      id: 1,
      year: "2022 - 2026",
      institution: "Universitas Djuanda Bogor",
      detail: "Sarjana Komputer (S1) - Ilmu Komputer | IPK: 3.91",
    },
  ],
  organization: [
    {
      id: 1,
      role: "Anggota Divisi NETKOM (BEM Fakultas Ilmu Komputer)",
      company: "Universitas Djuanda Bogor",
      year: "2023 - 2024",
      desc: "Menjalankan fungsi humas divisi, menjembatani komunikasi antara mahasiswa, dosen, dan fakultas pada program kerja seperti LDKM.",
    },
    {
      id: 2,
      role: "Anggota Divisi Olahraga (HIMASTER)",
      company: "Universitas Djuanda Bogor",
      year: "2022 - 2023",
      desc: "Bertindak sebagai Divisi Konsumsi pada kepanitiaan Vivace Futsal FISIPKOM UNIDA 2023 untuk mengoordinasikan logistik konsumsi.",
    },
  ],
  hobbies: ["Web Development", "UI/UX Design", "Coding", "Organisasi & Kolaborasi"],
  skills: {
    hard: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "JavaScript (Dasar)",
      "Laravel (Blade)",
      "Git (Dasar)",
      "MySQL (Dasar)",
      "UI/UX Design",
      "Responsive Web Design",
      "Flutter (Dasar)"
    ],
    soft: [
      "Problem Solving",
      "Manajemen Waktu",
      "Kerja Dalam Tim",
      "Tanggung Jawab",
      "Komunikatif",
      "Cepat Beradaptasi"
    ],
  },
  software: ["VS Code", "Figma", "Git / GitHub", "MySQL", "Postman"],
  experience: [
    {
      id: 1,
      role: "Finance Data Entry Intern",
      company: "CV. Sindikasi Artistik Indonesia (Sindikart)",
      year: "Jul - Agu 2024",
      desc: "Mencatat dan memasukkan data transaksi harian ke dalam sistem administrasi keuangan serta menjaga akurasi data dan dokumen pendukung.",
    },
    {
      id: 2,
      role: "Retail Store Assistant",
      company: "Bisnis Keluarga",
      year: "2019 - 2026",
      desc: "Melayani dan menangani keluhan pelanggan secara langsung serta mengelola penataan produk, pencatatan stok, dan pengemasan barang.",
    },
  ],
};

export default dataDiri;
