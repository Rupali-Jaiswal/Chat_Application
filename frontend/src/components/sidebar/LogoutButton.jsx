import { BiLogOut } from "react-icons/bi";
import {} from "react-icons"
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<div className="btn btn-ghost btn-sm"><BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} /></div>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;
