import { useMyContext } from "./useMyContext";

export default function NotFoundPage() {
    const { Theme } = useMyContext();
  return (
    <div className="archivo-black-regular w-100 d-flex flex-column align-items-center">
        <div className={`background-text ${Theme == 'dark'? 'background-text-dark':''}`}>404</div>
        <div>Page not found! <a href="/">Get back</a></div>
    </div>
  )
}
