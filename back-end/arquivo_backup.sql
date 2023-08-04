--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    cpf character varying(14) NOT NULL,
    rg character varying(12) NOT NULL,
    data_nasc date NOT NULL,
    sexo character varying(10) NOT NULL
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_seq OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente (id, nome, cpf, rg, data_nasc, sexo) FROM stdin;
1	Francisca Julia da Costa	457.696.936-65	47.360.897-2	1944-03-23	Feminino
2	Noah Felipe Silva	956.531.431-70	40.974.782-8	1964-07-11	Masculino
3	Al¡cia Rosƒngela Melo	066.291.353-18	36.214.141-1	1978-02-18	Feminino
4	Cristiane Renata Ana das Neves	946.074.401-08	32.301.736-8	1966-05-10	Feminino
5	Priscila Benedita Vanessa Ferreira	888.282.394-68	44.524.670-4	1966-11-15	Feminino
6	Bianca Carolina Nunes	484.323.140-13	44.466.563-8	1948-03-16	Feminino
7	Yuri Vicente Manuel Silveira	250.111.093-56	18.597.361-9	1974-09-05	Masculino
8	Melissa Alessandra Barros	446.675.916-25	25.598.673-7	2000-01-13	Feminino
9	M rcia Daniela Lara da Cruz	932.803.826-02	40.653.176-6	1986-06-04	Feminino
10	Filipe Anderson Rafael Assis	704.869.005-41	39.383.334-3	1995-11-19	Masculino
11	Lu¡s Vinicius SebastiÆo Jesus	035.960.588-56	29.915.692-8	1965-04-23	Masculino
12	Cec¡lia Caroline Nascimento	034.396.672-78	48.673.066-9	1951-02-04	Feminino
13	Raimunda Sandra Ferreira	757.187.891-85	21.189.806-5	1974-11-17	Feminino
14	Andreia Isabelly Juliana Melo	736.348.985-85	24.677.018-1	1963-10-11	Feminino
15	Nicolas Bernardo Moura	061.370.865-26	16.302.343-8	1989-06-08	Masculino
16	Diego Benjamin Tiago da Luz	991.152.443-42	38.315.100-4	1990-06-04	Masculino
17	Marlene Emanuelly Yasmin Cavalcanti	781.233.625-52	21.068.742-3	1961-10-15	Feminino
18	Vanessa Isabela da Luz	872.138.490-85	44.289.193-3	1982-09-05	Feminino
19	Camila Fl via Vera Mendes	790.524.518-77	40.847.994-2	1952-07-01	Feminino
20	Luana L¡via Lara Campos	532.901.056-01	14.732.946-2	1981-08-19	Feminino
21	Josefa Nina GalvÆo	379.743.833-80	13.878.690-2	1943-01-27	Feminino
22	Nat lia Isabelly Silvana da Paz	454.172.867-29	22.986.096-5	1980-09-17	Feminino
23	Amanda Sebastiana Vieira	703.941.038-90	50.251.196-5	1960-06-08	Feminino
24	Noah Pedro Alves	074.733.106-58	32.110.015-3	1992-08-14	Masculino
25	Giovana Camila da Concei‡Æo	418.746.840-49	35.520.215-3	1947-06-25	Feminino
26	Pietro Joaquim Emanuel Gon‡alves	003.502.230-25	12.099.068-4	1999-04-21	Masculino
27	Tereza Kamilly Mariana Porto	050.946.705-90	39.830.941-3	1959-06-16	Feminino
28	Caroline Emanuelly L¡via Moreira	673.831.546-57	24.561.727-9	1948-04-09	Feminino
29	Gabriel Ricardo da Paz	829.270.172-98	30.407.114-6	1980-03-24	Masculino
30	Giovanni Igor Augusto Pires	584.880.490-72	33.874.271-2	1946-08-24	Masculino
34	Luiz Antonio	946.643.079-34	3.322.824	1975-06-12	Masculino
\.


--
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_seq', 38, true);


--
-- Name: cliente cliente_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_cpf_key UNIQUE (cpf);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- Name: cliente cliente_rg_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rg_key UNIQUE (rg);


--
-- PostgreSQL database dump complete
--

