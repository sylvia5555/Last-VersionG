import { useState, useEffect } from "react";
import audioFile from "../../../Assets/MUsic.mp3"; // تأكد من المسار الصحيح

const EgyptianSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(audioFile); // إنشاء كائن الصوت باستخدام المسار الصحيح

  useEffect(() => {
    // تشغيل الصوت تلقائيًا عند تحميل الصفحة
    audio.play();
    setIsPlaying(true); // تغيير الحالة لتأكيد تشغيل الصوت
  }, []);

  return (
    <div className="egyptian-section">
      <h2>استمتع بتاريخنا الفرعوني</h2>
      <p>الصوت شغال تلقائيًا الآن.</p>
    </div>
  );
};

export default EgyptianSection;
