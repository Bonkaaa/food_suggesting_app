# Dự án "Hôm nay ăn gì"

## 1. Giới thiệu

"Hôm nay ăn gì" là một ứng dụng web được xây dựng để giúp người dùng khám phá và tìm kiếm các món ăn Việt Nam một cách dễ dàng và trực quan. Ứng dụng cho phép người dùng tìm kiếm món ăn, lọc theo nhiều tiêu chí như hương vị, nguyên liệu, và loại hình (tự nấu tại nhà hoặc gợi ý quán ăn).

## 2. Công nghệ sử dụng

Dự án được phát triển bằng các công nghệ hiện đại và mạnh mẽ:

- **Framework:** [Next.js](https://nextjs.org/) (sử dụng App Router)
- **Thư viện UI:** [React](https://react.dev/)
- **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Thư viện Component:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) cho tính năng gợi ý tìm kiếm thông minh.
- **Icons:** [Lucide React](https://lucide.dev/)

## 3. Cấu trúc thư mục

Dưới đây là cấu trúc các thư mục và tệp chính trong dự án:

```
.
├── src
│   ├── app/                # Chứa các trang chính và layout của ứng dụng
│   │   ├── globals.css     # File CSS toàn cục và cấu hình theme Tailwind/ShadCN
│   │   ├── layout.tsx      # Layout gốc của ứng dụng
│   │   └── page.tsx        # Trang chủ
│   │
│   ├── components/         # Chứa các React component có thể tái sử dụng
│   │   ├── ui/             # Các component cơ bản từ ShadCN UI
│   │   ├── dish-card.tsx
│   │   ├── dish-search-bar.tsx
│   │   └── filter-controls.tsx
│   │
│   ├── lib/                # Chứa các hàm tiện ích, dữ liệu và định nghĩa type
│   │   ├── data.ts         # Nơi lưu trữ dữ liệu tĩnh của ứng dụng (danh sách món ăn, nguyên liệu,...)
│   │   ├── placeholder-images.json # Quản lý các ảnh mẫu
│   │   ├── types.ts        # Định nghĩa các kiểu dữ liệu TypeScript
│   │   └── utils.ts        # Các hàm tiện ích chung
│   │
│   └── ai/                 # Chứa các logic liên quan đến AI
│       ├── genkit.ts       # Cấu hình Genkit
│       └── flows/          # Chứa các flow của Genkit (ví dụ: autocomplete)
│
├── public/                 # Chứa các tài sản tĩnh (hình ảnh, fonts)
├── package.json            # Quản lý các gói phụ thuộc và scripts của dự án
└── tailwind.config.ts      # Tệp cấu hình cho Tailwind CSS
```

## 4. Hướng dẫn cài đặt và sử dụng

Để chạy dự án này trên máy tính của bạn, hãy làm theo các bước sau:

**Yêu cầu:**
- [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
- [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/)

**Các bước thực hiện:**

1.  **Sao chép dự án:**
    Tải mã nguồn của dự án về máy tính của bạn.

2.  **Cài đặt các gói phụ thuộc:**
    Mở terminal trong thư mục gốc của dự án và chạy lệnh:
    ```bash
    npm install
    ```

3.  **Chạy máy chủ phát triển:**
    Sau khi cài đặt xong, chạy lệnh sau để khởi động máy chủ phát triển của Next.js:
    ```bash
    npm run dev
    ```

4.  **Mở ứng dụng:**
    Mở trình duyệt và truy cập vào địa chỉ [http://localhost:9002](http://localhost:9002) để xem ứng dụng.

Cảm ơn bạn đã sử dụng dự án!