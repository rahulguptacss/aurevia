'use client';

import { motion } from 'framer-motion';
import type { TeamSectionData } from '../../types';

function SocialIcon({ name }: { name: string }) {
  const common = { viewBox: '0 0 24 24', className: 'h-3.5 w-3.5 fill-current', 'aria-hidden': true as const };
  if (name === 'Instagram') {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.2-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2z" />
      </svg>
    );
  }
  if (name === 'Linkedin') {
    return (
      <svg {...common}>
        <path d="M6.5 9H4v11h2.5zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6a2.1 2.1 0 0 0-2 1.4 2 2 0 0 0-.1.9V20H11V9h2.4v1.5a3.4 3.4 0 0 1 3-1.7c2.2 0 3.6 1.4 3.6 4.4z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

export default function Team({ data }: { data: TeamSectionData }) {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1100px] px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mb-1 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
            <p className="text-[13px] font-extrabold tracking-[0.18em] text-[#e10600]">{data.subtitle}</p>
            <span className="h-[2px] w-8 rounded-full bg-[#e10600]" />
          </div>
          <h2 className="text-[32px] font-black leading-none tracking-[-0.03em] text-[#163a66] sm:text-[42px]">
            {data.title_line1} {data.title_highlight ? <span className="text-[#e10600]">{data.title_highlight}</span> : null}
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-[15px] leading-7 text-[#5b6b80]">{data.description}</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.members.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.06 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl border border-[#eef2f7] bg-white shadow-[0_8px_24px_rgba(22,58,102,0.06)]"
            >
              <img src={member.image} alt={member.name} className="h-[300px] w-full object-cover object-top sm:h-[190px]" />
              <div className="px-4 pb-3 pt-2.5">
                <h3 className="text-[16px] font-extrabold leading-tight text-[#163a66]">{member.name}</h3>
                <p className="mt-1.5 flex items-center gap-2 text-[13px] text-[#5b6b80]">
                  <span className="h-[2px] w-6 rounded-full bg-[#e10600]" />
                  {member.role}
                </p>
                <p className="mt-2 line-clamp-3 text-[13px] leading-5 text-[#6b778c]">{member.bio}</p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  {member.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e6ebf2] text-[#163a66] hover:bg-[#eef2f7] transition-colors"
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
