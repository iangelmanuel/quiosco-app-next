import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-40 h-40">
        <Image fill src="/logo.svg" alt="Logotipo Fresh Coffee" />
      </div>
    </div>
  )
}
