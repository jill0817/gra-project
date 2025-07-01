import React, { useState, useEffect } from "react";
import "./App.css"; // 可以把原本的 style 提取成 App.css

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={menuOpen ? "open" : ""}>
      <div className="nav-left">
        <img src="images/1.png" alt="Logo" />
        狐麻熊掌
      </div>
      <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "show" : ""}>
        <li>
          <a href="#logo" onClick={() => setMenuOpen(false)}>
            品牌Logo
          </a>
        </li>
        <li>
          <a href="#concept" onClick={() => setMenuOpen(false)}>
            發想理念
          </a>
        </li>
        <li>
          <a href="#story" onClick={() => setMenuOpen(false)}>
            品牌故事
          </a>
        </li>
        <li>
          <a href="#character" onClick={() => setMenuOpen(false)}>
            角色形象設計
          </a>
        </li>
        <li>
          <a href="#showcase" onClick={() => setMenuOpen(false)}>
            作品展示
          </a>
        </li>
        <li>
          <a href="#event" onClick={() => setMenuOpen(false)}>
            展出資訊
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            聯絡我們
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="logo-title">
        <h1 className="main-title">狐麻熊掌</h1>
        <p className="sub-title-2">圖傳113 畢製</p>
        <p className="sub-title">日系野餐環保餐盒 × 包布巾 × 故事食譜小冊</p>
      </div>
    </header>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Gallery() {
  return (
    <div id="showcase">
      <Section title="模型圖展示">
        <div className="two-column">
          <img src="images/8.png" alt="3D模型1" />
          <img src="images/9.png" alt="3D模型2" />
        </div>
      </Section>
      <Section title="布料圖展示">
        <div className="two-column">
          <img src="images/3.png" alt="布料1" />
          <img src="images/10.png" alt="布料2" />
        </div>
      </Section>
      <Section title="手繪食譜圖展示">
        <div className="two-column">
          <img src="images/5.png" alt="食譜封面" />
          <img src="images/6.png" alt="食譜內頁" />
        </div>
      </Section>
      <Section title="實體作品展示">
        <img
          src="images/2.png"
          alt="實體作品"
          style={{
            width: "100%",
            maxWidth: 500,
            display: "block",
            margin: "auto",
            borderRadius: 16,
          }}
        />
      </Section>
      <Section title="目標客群">
        <div className="audience">
          <div>追求儀式感的人</div>
          <div>響應環保的生活者</div>
          <div>親子出遊</div>
        </div>
      </Section>
    </div>
  );
}

function EventInfo() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://wttr.in/Taipei?format=%C+%t");
        const text = await res.text();
        setWeather(text);
      } catch (err) {
        setWeather("天氣資訊載入失敗");
      }
    };
    fetchWeather();
  }, []);

  return (
    <Section id="event" title="畢製展出資訊">
      <p>地點：國立臺灣師範大學 圖書館校區 綜合大樓2樓210展覽廳</p>
      <p>日期：2023/12/04（一）— 2023/12/08（五）</p>
      <p>時間：09:30 – 19:00 </p>
      <p>今日天氣：{weather || "載入中..."}</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14462.017947416114!2d121.5220147487826!3d25.01694803844321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9854425be61%3A0xc79998efecaf0634!2z5ZyL56uL6Ie654Gj5bir56-E5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1751275406755!5m2!1szh-TW!2stw"
        width="100%"
        height="400"
        style={{ border: 0, marginTop: 16 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="展覽地圖"
      ></iframe>
    </Section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        "https://685e674d7b57aebd2af94bea.mockapi.io/messages"
      );
      const data = await res.json();
      const filtered = data.filter((m) => m.email !== `email ${m.id}`);
      setMessages(filtered.reverse());
      setLoading(false);
    } catch (error) {
      console.error("抓留言失敗:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const res = await fetch(
        "https://685e674d7b57aebd2af94bea.mockapi.io/messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, message }),
        }
      );

      if (res.ok) {
        setSubmitted(true);
        e.target.reset();
        fetchMessages();
      } else {
        alert("送出失敗");
      }
    } catch (err) {
      alert("發生錯誤：" + err.message);
    }
  };

  return (
    <section id="contact" className="picnic-contact">
      <h2>聯絡我們</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="您的暱稱" required />
        <textarea
          name="message"
          rows="5"
          placeholder="想對狐麻熊掌說的話..."
          required
        ></textarea>
        <button type="submit">投遞給狐麻熊掌</button>
        {submitted && (
          <p style={{ color: "#6b4c3b", marginTop: "10px" }}>
            ✅ 已成功送出留言！
          </p>
        )}
      </form>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ textAlign: "center", color: "#a1745e" }}>大家的留言</h3>
        {loading ? (
          <p style={{ textAlign: "center" }}>載入中⋯</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                background: "#fffaf6",
                border: "1px solid #f0e0d3",
                padding: "12px",
                marginTop: "12px",
                borderRadius: "12px",
              }}
            >
              <strong>{msg.email}</strong>：{msg.message}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2025 狐麻熊掌 | 畢業專題 by 湯紀柔 & 周綺妮</p>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <Section id="logo" title="品牌Logo">
        <div className="two-column">
          <img src="images/1.png" alt="LOGO" />
          <p>
            設計理念參考日本家紋風格進行設計
            <br />
            使用於便當盒盒蓋、布巾角落樣花
          </p>
        </div>
      </Section>
      <Section id="concept" title="發想理念">
        <p>從吃出發，重啟生活</p>
        <p>
          利用日本道地春遊餐盒的形式 ，將原創故事元素融入日式圖樣進行產品設計
        </p>
        <p>為現代人帶來生活上的輕鬆休閒片刻，提升生活儀式感</p>
      </Section>
      <Section id="story" title="品牌故事">
        <p>
          對都市生活充滿好奇的小狐狸離開森林，在城市裡努力生活，
          卻漸漸失去了最初的熱情。
        </p>
        <p>直到與棕熊同事相遇並相約森林野餐， 才重新找回生活的美好與節奏。</p>
      </Section>
      <Section id="character" title="角色形象設計">
        <img
          src="images/4.png"
          alt="角色設計"
          style={{
            width: "100%",
            maxWidth: 600,
            display: "block",
            margin: "auto",
            borderRadius: 16,
          }}
        />
      </Section>
      <Gallery />
      <EventInfo />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
