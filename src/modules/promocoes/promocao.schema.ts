import * as yup from 'yup';

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const is15MinuteInterval = (value: string | undefined): boolean => {
    if (!value) return false;
    const parts = value.split(':');
    if (parts.length < 2 || !parts[1]) return false;
    const minutes = parseInt(parts[1], 10);
    if (Number.isNaN(minutes)) return false;
    return minutes % 15 === 0;
};

export const createPromocaoSchema = yup.object().shape({
    descricao: yup.string()
        .required('A descrição é obrigatória.'),

    preco_promocional: yup.number()
        .required('O preço promocional é obrigatório.')
        .positive('O preço deve ser um valor positivo.')
        .integer('O preço deve ser um número inteiro (centavos).'),

    dias_ativos: yup.array()
        .of(
            yup.number()
                .integer()
                .min(0, 'Dia deve ser entre 0 (Domingo) e 6 (Sábado)')
                .max(6, 'Dia deve ser entre 0 (Domingo) e 6 (Sábado)')
        )
        .min(1, 'Pelo menos um dia da semana é obrigatório.')
        .required('Os dias da semana são obrigatórios.'),

    tempo_inicio: yup.string()
        .required('O horário de início é obrigatório.')
        .matches(timeRegex, 'Formato de horário inválido (deve ser HH:mm).')
        .test(
            'is-15-minute-interval',
            'O horário de início deve ser em intervalos de 15 minutos (ex: 18:00, 18:15).',
            is15MinuteInterval
        ),

    tempo_fim: yup.string()
        .required('O horário de término é obrigatório.')
        .matches(timeRegex, 'Formato de horário inválido (deve ser HH:mm).')
        .test(
            'is-15-minute-interval',
            'O horário de término deve ser em intervalos de 15 minutos.',
            is15MinuteInterval
        )
        .test('is-end-time-greater-than-start-time', 'O horário de término deve ser maior que o horário de início.', function (value) {
            const { tempo_inicio } = this.parent;
            if (!tempo_inicio || !value) return true;
            return value > tempo_inicio;
        }),
});

export const updatePromocaoSchema = yup.object().shape({
    descricao: yup.string(),

    preco_promocional: yup.number()
        .positive('O preço deve ser um valor positivo.')
        .integer('O preço deve ser um número inteiro (centavos).'),

    dias_ativos: yup.array()
        .of(yup.number().integer().min(0).max(6))
        .min(1, 'Pelo menos um dia da semana é obrigatório.'),

    tempo_inicio: yup.string()
        .matches(timeRegex, 'Formato de horário inválido (deve ser HH:mm).')
        .test('is-15-minute-interval', 'Horário deve ser em intervalos de 15 minutos.', is15MinuteInterval),

    tempo_fim: yup.string()
        .matches(timeRegex, 'Formato de horário inválido (deve ser HH:mm).')
        .test('is-15-minute-interval', 'Horário deve ser em intervalos de 15 minutos.', is15MinuteInterval)
        .test('is-end-time-greater-than-start-time', 'O horário de término deve ser maior que o horário de início.', function (value) {
            const { tempo_inicio } = this.parent;
            if (!tempo_inicio || !value) return true;
            return value > tempo_inicio;
        }),

});