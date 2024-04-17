import React from 'react';
import styles from './weekly.module.css'; // Import CSS module

const WeeklyReportPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-100">
      <div className={`${styles.card} card mx-auto`}>
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">先週のアクションレポート</h2>
          <p className="text-center text-xl mb-10 italic">今週は色々な人に挨拶をしてコミュニケーションをとりましたね。今週は積極的に質問するようにしましょう。</p>
          <p className="text-center text-xl mb-6">【今週の強化アクション】</p>
          <p className="text-center mt-4 text-2xl font-bold pt-50 mb-10">遮らずに相手の話を聞こう</p>
          <div className={styles.progressBarContainer}>
            <div className={`${styles.progressBar}`} style={{ width: '40%' }}>
              40%
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WeeklyReportPage;
