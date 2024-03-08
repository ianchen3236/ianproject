export default function New(prop) {
  const { date, title, message } = prop
  return (
    <>
      <article className="new mb-3">
        <div className>
          <div className="d-flex">
            <div className="date">{date}</div>
            <div className="text_label">{title}</div>
          </div>
          <p className="message">{message}</p>
        </div>
      </article>

      <style jsx>{`
        .date {
          margin-right: 10px;
        }

        .date,
        .text_label {
          font-weight: bold;
          font-size: 18px;
        }

        .message {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
